<script>
    import KakaoMap from "$src/lib/components/KakaoMap.svelte";
</script>

<svelte:head>
    <script
        type="text/javascript"
        defer
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${
            import.meta.env.VITE_KAKAO_JSKEY
        }&libraries=services&autoload=false`}
    ></script>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-2 pt-28">
    <div class="text-center text-2xl font-semibold">오시는길</div>

    <div class="my-5 border-2 rounded-md">
        <KakaoMap getAddress={"서울특별시 강남구 강남대로116길 10"} />
    </div>

    <div class="mt-5 leading-7">
        <span class="block"
            >- Address : 서울특별시 강남구 강남대로116길 10, 5층</span
        >
        <span class="block">- CallNumber : 010-2222-3333</span>
    </div>
</div>
