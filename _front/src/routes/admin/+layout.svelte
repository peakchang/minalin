<script>
    import {
        admin_sidebar,
        admin_sidebar_width,
        user_info,
    } from "$src/lib/store";
    import Drawer from "$lib/components/Drawer.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let innerWidth;
    const width = 192;

    $: {
        if (innerWidth < 1000) {
            $admin_sidebar = false;
            $admin_sidebar_width = false;
        } else {
            $admin_sidebar = true;
            $admin_sidebar_width = true;
        }
    }

    onMount(() => {
        console.log($user_info);
        if (Object.keys($user_info).length === 0) {
            alert("로그인이 필요합니다.");
            goto("/auth/login");
        }
    });
</script>

<svelte:window bind:innerWidth />

<div
    class="fixed top-0 left-0 w-full bg-stone-300 py-2 px-6 suit-font z-30 flex items-center pretendard"
    class:ml-48={$admin_sidebar && $admin_sidebar_width}
>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button on:click={() => ($admin_sidebar = !$admin_sidebar)}>
        <i class="fa fa-bars" aria-hidden="true"></i>
    </button>

    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="/" class="mx-5">
        <i class="fa fa-home text-xl" aria-hidden="true"></i>
    </a>

    <span class="text-sm"> 관리자님 반갑습니다.</span>

    <!-- <a
        href="/auth/logout"
        class="ml-2 text-xs px-2 py-1 bg-red-400 rounded-md text-white"
    >
        로그아웃
    </a> -->
</div>

<Drawer drawerOpen={$admin_sidebar} bgGray={false} {width}>
    <div class="flex justify-between mb-5">
        <div>Admin</div>
        <div>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
                on:click={() => {
                    $admin_sidebar = false;
                }}
            >
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
        </div>
    </div>

    <a href="/admin">
        <div class="p-2 hover:bg-gray-100 rounded-md mb-1 text-sm">
            <span class="mr-1">
                <i class="fa fa-cog" aria-hidden="true"></i>
            </span>
            <span> 기본 관리 </span>
        </div>
    </a>

    <a href="/admin/mainimg">
        <div class="p-2 hover:bg-gray-100 rounded-md mb-1 text-sm">
            <span class="mr-1">
                <i class="fa fa-file-image-o" aria-hidden="true"></i>
            </span>
            <span> 메인이미지 </span>
        </div>
    </a>

    <a href="/admin/detailimg">
        <div class="p-2 hover:bg-gray-100 rounded-md mb-1 text-sm">
            <span class="mr-1">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
            </span>
            <span> 상세이미지 </span>
        </div>
    </a>

    <a href="/admin/reserve_manage">
        <div class="p-2 hover:bg-gray-100 rounded-md mb-1 text-sm">
            <span class="mr-1">
                <i class="fa fa-calendar-o" aria-hidden="true"></i>
            </span>
            <span> 예약일정관리 </span>
        </div>
    </a>

    <a href="/admin/board_manage">
        <div class="p-2 hover:bg-gray-100 rounded-md mb-1 text-sm">
            <span class="mr-1">
                <i class="fa fa-columns" aria-hidden="true"></i>
            </span>
            <span> 게시판 관리 </span>
        </div>
    </a>
</Drawer>

<div
    class="mt-14 px-2 text-sm suit-font"
    class:ml-52={$admin_sidebar && $admin_sidebar_width}
>
    <slot />
</div>

<style>
    .side-menu {
        padding: 8px 0px;
        font-size: 16px;
    }

    :global(.input-base) {
        border-radius: 6px;
        padding: 7px 5px;
        border: 1px solid #cfcfcf;
        width: 100%;
        font-size: 14px;
        background-color: #f6f6f6;
    }
    :global(.input-base:focus) {
        border: 1px solid #40a9ff;
        outline: none;
        background-color: #ffffff;
    }
    :global(.in-th) {
        padding: 10px 5px;
        border: 1px solid #cfcfcf;
    }
    :global(.in-td) {
        padding: 3px 2px;
        border: 1px solid #cfcfcf;
    }
</style>
