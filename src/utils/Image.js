/* eslint-disable import/prefer-default-export */
export function updateImgUrl(products) {
  // Function updates image url of products with cdn url
  return products.map((product) => {
    if (product.imgUrl && product.imgUrl.split('/')[0] === 'images') {
      return {
        ...product,
        imgUrl: `${process.env.CDN_ENPOINT}/${product.imgUrl}`,
      };
    }
    return product;
  });
}