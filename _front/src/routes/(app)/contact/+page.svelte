<script>
    let testArr = [0, 1, 2, 3, 4, 5];
</script>

<div class="max-w-[1000px] mx-auto px-2 pt-28 suit-font">
    <div class="text-center text-lg font-semibold pb-5">예약 / 문의</div>

    <div class="border-t border-black text-sm md:text-base">
        <div class="li_board md:table w-full">
            <ul class="hidden md:table-row-group border-b">
                <li class="no hidden md:table-cell w-1/12 p-2 md:border-b">
                    No
                </li>
                <li class="tit md:table-cell px-3 pt-2 md:py-3 md:border-b">
                    제목
                </li>
                <li
                    class="name md:table-cell md:w-1/6 px-3 md:text-right md:border-b"
                >
                    글쓴이
                </li>
            </ul>

            {#each testArr as a}
                <ul class="md:table-row-group border-b">
                    <li class="no hidden md:table-cell w-1/12 p-2 md:border-b">
                        168
                    </li>
                    <li class="tit md:table-cell px-3 pt-2 md:py-3 md:border-b">
                        <a href="/contact/123">
                            <div
                                class="flex items-center justify-between md:justify-start"
                            >
                                <div class="mr-2">
                                    <span class="text-gray-500 text-lg mr-2">
                                        <i class="fa fa-lock" aria-hidden="true"
                                        ></i>
                                    </span>
                                    <span>
                                        예약 게시판 입니다. 자세한 상황은 문의를
                                        통해 부탁드립니다.
                                    </span>
                                </div>
                                <div>
                                    <span class="text-gray-500 mr-2">
                                        <i
                                            class="fa fa-comment-o"
                                            aria-hidden="true"
                                        ></i>
                                        <span class="text-red-600">2</span>
                                    </span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li
                        class="name md:table-cell md:w-1/6 px-3 md:text-right md:border-b"
                    >
                        글쓴이
                    </li>
                </ul>
            {/each}
        </div>
    </div>
</div>

<style>
    /* .li_board{
        width: 100%;
        display: table;
        font-size: 14px;
    }

    .li_board ul{
        list-style: none;
        margin-bottom: 0;
        clear: both;
        display: table-row-group;
    }

    

    .li_board ul li{
        padding: 10px 7px;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        border-width: 0 0 1px 0;
        border-style: solid;
    }

    .li_board ul li.no{
        width: 5%;
    }

    @media(max-width:768px){
        .li_board{
            display: block;
        }

        .li_board ul{
            padding: 10px 15px 15px 15px;
            display: block;
            border-width: 0 0 1px 0;
            border-style: solid;
        }

        .li_board ul li{
            display: block;
            border : 0;
            padding: 0px;
        }

        .li_board ul li.no{
            display: none;
        }
    }

    

    .li_board ul li.name{
        width: 10%;
    } */
</style>
