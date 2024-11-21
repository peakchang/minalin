<script>
    import axios from "axios";
    import { back_api } from "$src/lib/const";
    import SortableImg from "$src/lib/components/SortableImg.svelte";
    import { invalidateAll } from "$app/navigation";

    let { data } = $props();

    console.log(data);
    let imgArr = $state(data.mainImageList);

    function updateImg(e) {
        console.log("여기는 어떻게 되야?!?!?!?!");
        console.log(e);
        imgArr = e;
    }

    async function mainImageUpdate() {
        console.log(imgArr);
        const imgArrStr = imgArr.join(",");

        try {
            const res = await axios.post(`${back_api}/update_main_image_list`, {
                imgArrStr,
            });
            console.log(res);

            if (res.status == 200) {
                alert("업데이트 완료!!");
                invalidateAll();
            }
        } catch (error) {}
    }
</script>

<div>
    <div class="flex items-center gap-5">
        <span class="text-lg"
            >메인 이미지 수정
            <button class="btn btn-success min-h-8 h-8 text-white" on:click={mainImageUpdate}>
                업데이트
            </button>
        </span>
    </div>
    <div class="text-xs md:text-sm mt-2">
        ※ 이미지 추가 / 순서변경 / 삭제 등을 한 뒤 업데이트를 클릭해야 적용
        완료됨!
    </div>
    <SortableImg {updateImg} maxImgCount={9999} imgModifyList={imgArr}
    ></SortableImg>
</div>
