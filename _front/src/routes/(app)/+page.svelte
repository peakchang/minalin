<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    let mainSwiper;
    let swiperContain;
    let swiper2;
    let swiper;

    let loading = true;

    $: loading, logLodding();

    function logLodding() {
        console.log(loading);
    }

    let imgArr = [
        "img0.jpg",
        "img1.jpg",
        "img2.jpg",
        "img3.jpg",
        "img4.jpeg",
        "img5.jpeg",
        "img6.jpeg",
        "img7.jpeg",
        "img8.jpeg",
        "img9.jpeg",
        "img10.jpeg",
    ];

    let detailImgArr = Array.from({ length: 30 }, (_, i) => i);

    let imgHeights = [];
    // let windowHeight = window.innerHeight;
    let windowHeight = 0;
    let wrapperHeights = [];

    onMount(() => {
        // main init Swiper:
        mainSwiper = new Swiper(".main-swiper", {
            loop: true,
            effect: "fade",
            spaceBetween: 30,
            autoplay: {
                delay: 1500,
            },
        });

        swiper = new Swiper(".mySwiper", {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            // autoplay: {
            //     delay: 3000,
            // },
        });
        swiper2 = new Swiper(".mySwiper2", {
            loop: true,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 3000,
            },
            thumbs: {
                swiper: swiper,
            },
        });

        // const imgs = document.querySelectorAll("img");
        // console.log(imgs);

        // imgs.forEach((img, index) => {
        //     img.onload = () => {
        //         const imgHeight = img.clientHeight;
        //         console.log(imgHeight);

        //         imgHeights[index] = imgHeight;
        //         adjustHeight(index, imgHeight);
        //     };
        // });
    });

    // function adjustHeight(index, imgHeight) {
    //     if (browser) {
    //         windowHeight = window.innerHeight;
    //         wrapperHeights[index] =
    //             imgHeight > windowHeight ? "100vh" : `${imgHeight}px`;
    //     }
    // }
</script>

<div class="main-swiper">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        {#each imgArr as img, idx}
            <div
                class="swiper-slide img_wrapper"
                style="height: {wrapperHeights[idx] || 'auto'}"
            >
                <img src="/swiper_img/{img}" alt="" />
            </div>
        {/each}
    </div>
</div>

<div class="max-w-[1200px] mx-auto">
    <div class="py-10 my-3 border text-center">설명이 들어갈수 있는 부분!!</div>
</div>

<div class="container mx-auto">
    <div class="w-full md:w-3/5 mx-auto pt-3 px-3 bg-black">
        <div style="" class="swiper mySwiper2">
            <div class="swiper-wrapper flex items-center">
                {#each detailImgArr as detailImg}
                    <div class="swiper-slide">
                        <img src="/swiper_detail_img/img{detailImg}.jpg" />
                    </div>
                {/each}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
        <div thumbsSlider="" class="swiper mySwiper bg-black">
            <div class="swiper-wrapper">
                {#each detailImgArr as detailImg}
                    <div class="swiper-slide">
                        <img src="/swiper_detail_img/img{detailImg}.jpg" />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .main-swiper {
        height: 100vh;
        overflow: hidden;
    }

    @media (max-width: 800px) {
        .main-swiper {
            height: 80vh;
        }
    }
    .swiper-slide img {
        width: 100%;
        height: auto;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .swiper-slide {
        background-size: cover;
        background-position: center;
    }

    .mySwiper2 {
        height: 10%;
        width: 100%;
    }

    .mySwiper {
        height: 150px;
        box-sizing: border-box;
        padding: 10px 0;
    }

    .mySwiper .swiper-slide {
        width: 25%;
        height: 100%;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
