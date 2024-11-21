import express from "express";
import { sql_con } from '../back-lib/db.js'

const mainRouter = express.Router();

mainRouter.get('/load_image_list', async (req, res, next) => {
    let main_image_list = [];
    let detail_image_list = [];
    try {
        const getBaseDataQuery = "SELECT main_image_list,detail_image_list FROM base_data WHERE config = ?"
        const [baseDataRow] = await sql_con.promise().query(getBaseDataQuery, ['base']);
        console.log(baseDataRow);
        if (baseDataRow[0]) {
            main_image_list = baseDataRow[0].main_image_list
            detail_image_list = baseDataRow[0].detail_image_list
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to get base data' });
    }

    console.log(main_image_list);
    console.log(detail_image_list);
    
    

    res.json({ main_image_list, detail_image_list })
})

export { mainRouter }