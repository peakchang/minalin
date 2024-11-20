<script>
    import { onMount, tick } from "svelte";
    import { browser } from "$app/environment";

    let yAxis;
    let inner_width;
    let gnbWhiteBool = false;

    $: yAxis, senseYAxis();
    function senseYAxis() {
        if (yAxis > 70) {
            gnbWhiteBool = true;
        } else {
            gnbWhiteBool = false;
        }
    }

    const menuList = [
        { name: "오시는길", link: "location" },
        { name: "예약현황", link: "schedule" },
        // { name: "예약하기", link: "reservation" },
        { name: "예약 / 문의", link: "contact" },
    ];

    onMount(async () => {
        if (browser) {
            kakao = window.kakao;
        }
    });
</script>

<svelte:window bind:scrollY={yAxis} bind:innerWidth={inner_width} />

<div class="fixed right-6 z-[99999]" style="bottom: 13%;">
    <a href="">
        <div class="w-16 bg-yellow-400 p-3 rounded-full mb-1">
            <img src="/kakao_icon.png" alt="" />
        </div>
        <div class="bg-gray-200 text-xs text-center rounded-full py-0.5">
            카톡문의
        </div>
    </a>
</div>

<div
    class="hidden md:block fixed left-0 top-0 z-[9999] w-full gnb-wrapper px-8 py-3"
    class:scrolled={gnbWhiteBool}
>
    <div class="flex justify-between items-center">
        <div class="w-60">
            <a href="/">
                <img src="/logo.png" alt="" class="w-full" />
            </a>
        </div>
        <div>
            <ul class="flex items-center gap-8 font-semibold text-lg font-noto">
                {#each menuList as menu}
                    <li><a href="/{menu.link}">{menu.name}</a></li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<div
    class="md:hidden fixed left-0 top-0 z-[9999] w-full gnb-wrapper px-8 pt-3"
    class:scrolled={gnbWhiteBool}
>
    <div class=" w-32 mx-auto">
        <a href="/">
            <img src="/logo.png" alt="" class="w-full" />
        </a>
    </div>
    <div class="pt-1 pb-2">
        <ul class="flex justify-around text-sm font-noto">
            {#each menuList as menu}
                <li><a href="/{menu.link}">{menu.name}</a></li>
            {/each}
        </ul>
    </div>
</div>

<div class="font-noto">
    <slot></slot>
</div>

<hr class="my-3 border-none h-0.5 bg-gray-400" />

<div class="max-w-[1000px] mx-auto pt-3 pb-8 font-noto">
    <div class="px-5 text-xs md:text-sm leading-5">
        <span class="inline-block">대표 : 김민아 |</span>
        <span class="inline-block">사업자 : 205-10-63647 |</span>
        <span class="inline-block">주소 : 서울특별시 강남구 강남대로116길 10, 5층(논현동) |</span>
        <span class="inline-block">통신판매업신고번호 : 2024-서울강남-05429 |</span>
        <span class="inline-block">전화번호 : 010-2222-3333 |</span>
    </div>
</div>

<style>
    @import url("//fonts.googleapis.com/earlyaccess/notosanskr.css");

    :global(.font-noto) {
        font-family: "Noto Sans KR", sans-serif; /* 기본 폰트 설정 */
    }
    .gnb-wrapper {
        background-color: rgba(55, 65, 81, 0.25);
        transition: background-color 0.3s ease; /* 애니메이션 설정 */
        color: white;
    }
    .gnb-wrapper.scrolled {
        background-color: white; /* 스크롤 시 흰색으로 변경 */
        border-bottom: 2px solid black;
        color: black;
    }
</style>
