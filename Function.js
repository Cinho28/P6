
export function showAllWorks() {

    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
        document.querySelector(".gallery").innerHTML = '';
        works.forEach(work => {
            const figure = document.createElement("figure");
            figure.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
            `;
            document.querySelector(".gallery").appendChild(figure);
        });
        
    });
}