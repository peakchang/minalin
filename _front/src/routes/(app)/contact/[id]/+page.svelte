<div class="max-w-[1000px] mx-auto px-2 pt-28 suit-font">
    <div class="content_area border-b pb-3">
        <div>
            <span class="text-xl md:text-2xl">[공지] 문의 게시판 입니다.</span>
        </div>
        <div class="py-2 border-b text-sm md:text-base">최고관리자</div>

        <div class="pt-5 text-sm md:text-base">
            <p>문의 게시판 입니다.</p>
            <p>궁금한 부분 있으시면</p>
            <p>이곳에 남겨주세요</p>
        </div>
    </div>

    <div class="reply_write_area pt-3">
        <div>
            <input
                type="text"
                class="border p-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="이름"
            />
            <input
                type="text"
                class="border p-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="비밀번호"
            />
        </div>

        <div class="border mt-3 p-3">
            <div>
                <textarea
                    class="w-full text-sm focus:outline-none resize-none"
                    rows="4"
                    placeholder="답변을 남겨주세요"
                ></textarea>
            </div>
            <div class="text-right">
                <button
                    class="border border-red-400 text-red-400 hover:bg-red-400 hover:text-white active:bg-red-500 text-sm py-1.5 px-4 rounded"
                >
                    등록하기
                </button>
            </div>
        </div>
        <div class="mt-3 flex justify-between">
            <button
                class="border border-red-400 text-red-400 hover:bg-red-400 hover:text-white active:bg-red-500 text-sm py-1.5 px-4 rounded"
            >
                목록
            </button>

            <button
                class="border border-red-400 text-red-400 hover:bg-red-400 hover:text-white active:bg-red-500 text-sm py-1.5 px-4 rounded"
            >
                글쓰기
            </button>
        </div>
    </div>

    <div class="reply_area"></div>
</div>
