<script>
    import "../app.css";
</script>

<svelte:head>
    <!-- Swiper JS -->
    <script
        src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
    ></script>
    <!-- Link Swiper's CSS -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />

    <!-- fontawesome -->
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
    />

    <!-- suit font -->
    <link
        href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
        rel="stylesheet"
    />

    <!-- quill -->
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.min.js"
        type="text/javascript"
    ></script>

    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.snow.min.css"
        rel="stylesheet"
    />

    <script
        type="text/javascript"
        defer
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=36aa75a1c58848caeb4edc00f6e9535d&libraries=services&autoload=false`}
    ></script>
</svelte:head>



<slot></slot>

<style>
    :global(.suit-font) {
        font-family: "SUIT" !important;
    }
</style>
