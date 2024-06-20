import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userAgent = req.headers['user-agent'];
  const axiosClient = axios.create({
    headers: {
      'User-Agent': userAgent,
      'Accept-Language': 'en-US,en;q=0.5',
      'Referer': 'https://www.terabox.com/sharing/link?surl=gfujeeyKv_ZGFd_dAJ3uXw',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
    }
  });

  const allowedHostnames = [
    'www.terabox.com',
    'terabox.com',
    'www.teraboxapp.com',
    'teraboxapp.com',
    '1024tera.com',
    'www.1024tera.com'
  ];
  const dpLogId = '59350200172865410009';
  const jsToken = '3D1900FFEDE22A36D2E6D36ABAAE9CEB74926E292F0986A22DEF1DA25812774556754CAACE1AD4C44240AB83098E4DDC9DAA210A461D3A837D60301AEBC78DFD';
  const appId = '250528';

  const url = req.body.url;

  try {
    if (!url) {
      throw new Error('Need parameter `url`');
    }

    let urlData: URL;
    try {
      urlData = new URL(url);
    } catch (error) {
      throw new Error('Not valid url');
    }

    const found = allowedHostnames.includes(urlData.hostname);
    if (!found) {
      throw new Error('Not valid hostname');
    }

    const shareCode = urlData.pathname.split('/').slice(-1)[0];
    if (shareCode[0] !== '1') {
      throw new Error('Not valid share code');
    }

    try {
      const response = await axiosClient.get(`https://www.terabox.com/api/shorturlinfo`, {
        params: {
          app_id: appId,
          web: 1,
          channel: 'dubox',
          clienttype: 0,
          jsToken: jsToken,
          'dp-logid': dpLogId,
          shorturl: shareCode,
          root: 1
        }
      });

      if (response.data.errno !== 0) {
        throw new Error('Failed to get data');
      }

      console.log({
        data: {
            shareid: response.data.shareid,
            uk: response.data.uk,
            sign: response.data.sign,
            timestamp: response.data.timestamp,
            list: response.data.list.map((file: any) => ({
              fs_id: file.fs_id,
              filename: file.server_filename,
              size: file.size
            })),
          }
      });
      
      res.status(200).json({
        result: true,
        data: {
          shareid: response.data.shareid,
          uk: response.data.uk,
          sign: response.data.sign,
          timestamp: response.data.timestamp,
          list: response.data.list.map((file: any) => ({
            fs_id: file.fs_id,
            filename: file.server_filename,
            size: file.size
          })),
        }
      });
    } catch (error) {
      throw new Error('Failed to get data');
    }
  } catch (error: any) {
    res.status(400).json({ result: false, message: error.message });
  }
}
