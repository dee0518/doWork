interface Images {
  [key: string]: string;
}

function importAll(r) {
  const images: Images = {};
  r.keys().map(item => {
    images[item.replace('./', '')] = r(item);

    return item;
  });

  return images;
}

const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

export default images;
