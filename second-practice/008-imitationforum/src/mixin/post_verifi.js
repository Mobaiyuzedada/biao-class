export default {
    methods: {
        post_verifi() {
            let placeholderText = '';
            if (!this.postTitle().value) {
                placeholderText = this.postTitle().placeholder;
                let t1 = setInterval(() => {
                    this.postTitle().placeholder = placeholderText + "不能为空";
                    this.postTitle().classList.add("invalid");
                    if (!this.postTitle().style.backgroundColor) {
                        this.postTitle().style.backgroundColor = "rgba(255,187,187)";
                    } else {
                        this.postTitle().style.backgroundColor = "";
                    }
                }, 400);
                setTimeout(() => {
                    clearInterval(t1);
                    this.postTitle().placeholder = placeholderText;
                    this.postTitle().classList.remove("invalid");
                }, 1600);
                return false;
            }
            return true;
        },
        postTitle() {
            //获取标题元素
            return document.querySelector(".post-title");
        }
    },
}
