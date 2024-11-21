<script>
    import { tick } from "svelte";
    import imageCompression from "browser-image-compression";
    import axios from "axios";
    import { back_api } from "$src/lib/const";

    let {
        updateImg,
        maxImgCount = 999999,
        imgModifyList = [],
        btnLocation = "left",
    } = $props();

    let imgArr = $state([]);
    if (imgModifyList.length > 0) {
        imgArr = imgModifyList;
    }

    // let positions = new Map();
    // let animating = false;

    let hoverColor = "#FFFFD2"; // 드래그 드롭시 변경되는 배경색 (변경 가능)

    let hoveredIndex = $state(null); // 현재 마우스 오버 인덱스
    let draggedIndex = $state(null); // 드래그된 인덱스 (모바일용)

    let mouseX = 0; // 마우스/터치 X 좌표
    let mouseY = 0; // 마우스/터치 Y 좌표

    let isDragging = false; // 드래그 상태

    function dragOverAction() {
        updateImg(imgArr);
    }

    async function deleteImg() {
        const arrIdx = this.value;
        const deleteData = imgArr[arrIdx];

        const getImgSplit = deleteData.split("/");
        const getImgName = getImgSplit[getImgSplit.length - 1];

        console.log(getImgName);
        try {
            const res = await axios.post(`${back_api}/delete_sort_img`, {
                getImgName,
            });

            if (res.status == 200) {
                imgArr.splice(arrIdx, 1);
                updateImg(imgArr);
            } else {
                alert("에러가 발생했습니다. 다시 시도해주세요");
            }
        } catch (error) {
            console.error(error.message);
        }

        // const res = await axios.post()
    }

    // 이미지를 선택하면 사이즈 변경 (최대 1200px) 및 webp 변경 후 업로드
    const onFileSelected = (e) => {
        if (imgArr.length >= maxImgCount) {
            alert(`최대 ${maxImgCount}개 이미지만 업로드 가능합니다.`);
            return false;
        }

        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", ".png,.jpg,.jpeg");
        input.click();

        // input change
        input.onchange = async (e) => {
            const imageFile = e.target.files[0];
            const options = {
                maxSizeMB: 1, // 최대 파일 크기 (MB)
                maxWidthOrHeight: 1024, // 최대 너비 또는 높이
                useWebWorker: true, // 웹 워커 사용
            };

            try {
                const compressedFile = await imageCompression(
                    imageFile,
                    options,
                );
                console.log("Compressed file:", compressedFile);
                console.log(compressedFile.name);

                let imgForm = new FormData();

                const timestamp = new Date().getTime();
                const fileName = `${timestamp}${Math.random()
                    .toString(36)
                    .substring(2, 11)}.${compressedFile.name.split(".")[1]}`;

                console.log(fileName);

                imgForm.append("onimg", compressedFile, fileName);

                // FormData의 key 값과 value값 찾기
                // let keys = imgForm.keys();
                // for (const pair of keys) {
                //     console.log(`name : ${pair}`);
                // }

                // let values = imgForm.values();
                // for (const pair of values) {
                //     console.log(`value : ${pair}`);
                // }

                let res = {};
                try {
                    res = await axios.post(`${back_api}/upload_img`, imgForm, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                } catch (error) {
                    console.error("Error during image upload:", error.message);
                    alert("이미지 업로드 오류! 다시 시도해주세요!");
                    return;
                }

                console.log(res);

                if (res.status == 200) {
                    imgArr.push(res.data.baseUrl);
                    imgArr = [...new Set(imgArr)];
                    updateImg(imgArr);
                }
            } catch (error) {
                console.error("Error during image compression:", error);
                alert("이미지 업로드 오류! 다시 시도해주세요!");
            }
        };
    };

    // *************** 아래는 정렬되는 드래그 앤 드롭 함수!!! 건들지 말자!!! ********************
    // 상태 관리

    function handleTouchStart(event, index) {
        const touch = event.touches[0];
        startDragging(index, touch.clientX, touch.clientY);
    }

    function handleTouchMove(event) {
        if (!isDragging) return;

        event.preventDefault(); // 기본 스크롤 방지
        const touch = event.touches[0];
        updateDraggingPosition(touch.clientX, touch.clientY);

        // 터치 위치에서 오버된 요소 감지
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.dataset.index) {
            hoveredIndex = Number(target.dataset.index);
        }
    }

    async function handleTouchEnd() {
        if (!isDragging) return;

        if (
            draggedIndex !== null &&
            hoveredIndex !== null &&
            draggedIndex !== hoveredIndex
        ) {
            // 배열 값 교환
            const updatedItems = [...imgArr];
            [updatedItems[draggedIndex], updatedItems[hoveredIndex]] = [
                updatedItems[hoveredIndex],
                updatedItems[draggedIndex],
            ];

            await animateSwap(draggedIndex, hoveredIndex);
            imgArr = updatedItems;
        }
        resetDragState();
    }

    function handleMouseDown(event, index) {
        startDragging(index, event.clientX, event.clientY);
    }

    function handleMouseMove(event) {
        if (!isDragging) return;

        updateDraggingPosition(event.clientX, event.clientY);

        // 마우스 위치에서 오버된 요소 감지
        const target = document.elementFromPoint(event.clientX, event.clientY);
        if (target && target.dataset.index) {
            hoveredIndex = Number(target.dataset.index);
        }
    }

    function handleMouseUp() {
        if (!isDragging) return;

        if (
            draggedIndex !== null &&
            hoveredIndex !== null &&
            draggedIndex !== hoveredIndex
        ) {
            // 배열 값 교환
            const updatedItems = [...imgArr];
            [updatedItems[draggedIndex], updatedItems[hoveredIndex]] = [
                updatedItems[hoveredIndex],
                updatedItems[draggedIndex],
            ];

            animateSwap(draggedIndex, hoveredIndex);
            imgArr = updatedItems;
        }
        resetDragState();
    }

    function startDragging(index, x, y) {
        draggedIndex = index;
        mouseX = x;
        mouseY = y;
        isDragging = true;
    }

    function updateDraggingPosition(x, y) {
        mouseX = x;
        mouseY = y;
    }

    function resetDragState() {
        draggedIndex = null;
        hoveredIndex = null;
        isDragging = false;
    }

    async function animateSwap(fromIndex, toIndex) {
        const elements = document.querySelectorAll("li");
        const fromElement = elements[fromIndex];
        const toElement = elements[toIndex];

        // 두 요소의 위치 계산
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        const deltaX = toRect.left - fromRect.left;
        const deltaY = toRect.top - fromRect.top;

        // 이동 애니메이션 설정
        fromElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        toElement.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;

        await tick();
        fromElement.style.transition = "transform 0.3s ease";
        toElement.style.transition = "transform 0.3s ease";

        // 애니메이션 완료 대기
        await new Promise((resolve) => setTimeout(resolve, 300));

        // 스타일 초기화
        fromElement.style.transform = "";
        toElement.style.transform = "";
        fromElement.style.transition = "";
        toElement.style.transition = "";
    }
</script>

<ul>
    {#each imgArr as img, index (img)}
        <!-- svelte-ignore event_directive_deprecated -->
        <li
            draggable="true"
            data-key={img}
            class="{hoveredIndex === index ? 'hovered' : ''} {draggedIndex ===
                index && isDragging
                ? 'dragging'
                : ''}"
            style={draggedIndex === index && isDragging
                ? `left: ${mouseX}px; top: ${mouseY}px;`
                : ""}
            on:mousedown={(event) => handleMouseDown(event, index)}
            on:touchstart={(event) => handleTouchStart(event, index)}
            on:touchmove={handleTouchMove}
            on:touchend={handleTouchEnd}
        >
            <div class="w-full h-full flex items-center relative">
                <button
                    class="absolute top-0 right-0 text-red-600 cursor-default"
                    value={index}
                    on:click={deleteImg}
                >
                    <i class="fa fa-times-circle-o"></i>
                </button>
                <img src={img} alt="" />
            </div>
        </li>
    {/each}
</ul>

<div id="app" class="pretendard mt-3">
    <div
        class:text-left={btnLocation == "left"}
        class:text-center={btnLocation == "center"}
        class:text-right={btnLocation == "right"}
    >
        <button
            class="flex items-center gap-2 bg-green-600 active:bg-green-700 py-1 px-3 rounded-md text-white text-sm"
            on:click={onFileSelected}
        >
            <i class="fa fa-file-image-o" aria-hidden="true"></i>
            이미지 업로드
        </button>
    </div>
</div>

<style>
    ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    li {
        padding: 5px;
        width: 120px;
        height: 120px;
        background: #f3f3f3;
        border: 1px solid #ddd;
        cursor: grab;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
    }
    li.hovered {
        background: var(--hover-color, red); /* 오버된 상태의 배경색 */
    }
</style>
