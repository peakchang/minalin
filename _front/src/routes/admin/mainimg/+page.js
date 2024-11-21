import axios from "axios";
import { back_api } from "$lib/const";

export const load = async ({ params, url }) => {
    let mainImageList = [];
    try {
        console.log(back_api);

        const res = await axios.get(`${back_api}/admin/load_main_image_list`);
        if (res.status == 200) {
            if (res.data.main_image_list.length > 0) {
                mainImageList = res.data.main_image_list.split(',');
            }
        }
    } catch (error) {

    }

    return { mainImageList };
}