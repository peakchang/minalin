import axios from "axios";
import { back_api } from "$lib/const";

export const load = async ({ params, url }) => {
    let detailImageList = [];
    try {
        console.log(back_api);

        const res = await axios.get(`${back_api}/load_detail_image_list`);
        if (res.status == 200) {
            if (res.data.detail_image_list.length > 0) {
                detailImageList = res.data.detail_image_list.split(',');
            }
        }
    } catch (error) {

    }

    return { detailImageList };
}