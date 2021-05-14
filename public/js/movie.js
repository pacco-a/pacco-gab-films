const delBtns = Array.from(document.querySelectorAll(".movie-elem button"));

for (const delBtn of delBtns) {
    delBtn.addEventListener("click", (e) => {
        const movieId = e.target.classList[1];
        axios
            .delete(`/movies/${movieId}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                window.location.href = "/movies/home";
            });
    });
}
