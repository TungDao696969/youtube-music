export default function ListMootsCard (album) {
    return `
         <a href ="/moods/${album.slug}" class="bg-white/10 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20 " data-link >${album.name}</a>
    `;
}