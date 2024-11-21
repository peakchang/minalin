import axios from "axios";
import { back_api } from "$lib/const";

export const load = async ({ params, url }) => {
    let mainImageList = [];
    let detailImageList = [];
    try {
        console.log(back_api);

        const res = await axios.get(`${back_api}/main/load_image_list`);
        console.log(res);

        if (res.status == 200) {
            if (res.data.detail_image_list.length > 0) {
                detailImageList = res.data.detail_image_list.split(',');
            }
            if (res.data.main_image_list.length > 0) {
                mainImageList = res.data.main_image_list.split(',');
            }
        }
    } catch (err) {
        console.error(err.message);
    }

    return { detailImageList, mainImageList };
}