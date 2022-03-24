function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { 
        images[item.replace('./', '')] = r(item).default; 

        return item
    });
    
    return images;
}

const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

export default images