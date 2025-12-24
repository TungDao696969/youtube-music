export default function ListMootsCard (album) {
    return `
         <a href ="/moods/${album.slug}" class="bg-white/10 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/20 text-sm" data-link >${album.name}</a>
    `;
}