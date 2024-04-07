import CarouselItem from "../components/corousel/CarouselItem";
import SpecialProduct from "../components/special-product/SpecialProduct";

export function formatDate(inputDateString) {
  const dateObject = new Date(inputDateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  return formattedDate;
}

export function formateDate2(inputDateString) {
  const inputDate = new Date(inputDateString);

  const formattedDate = inputDate.toISOString().split("T")[0];
  return formattedDate;
}

export function totalDisplayImg(number, product = []) {
  if (number >= product.length) {
    return product;
  } else {
    let newProduct = [];
    for (let i = 0; i < number; i++) {
      newProduct[i] = product[i];
    }
    return newProduct;
  }
}

export function generateCarouselItem(products) {
  let data = [];
  data = products.map((item) => (
    <div key={item?._id}>
      <CarouselItem
        name={item?.title}
        url={item?.image?.[0]?.url}
        price={item?.price}
        description={item?.description}
        _id={item?._id}
      />
    </div>
  ));
  return data;
}

export function filterProduct(products, filterType, filterOnWhich) {
  let data = [];

  if (!products || products?.length !== 0) {
    data = products?.filter((product) => product[filterType] === filterOnWhich);
  }

  return data;
}

export function generateSpecialCarouselItem(products) {
  let data = [];
  data = products.map((item) => {
    const { totalrating, brand } = item;
    return (
      <div key={item?._id} className="special-product-slider">
        <SpecialProduct
          name={item?.title}
          url={item?.image?.[0]?.url}
          price={item?.price}
          description={item?.description}
          _id={item?._id}
          brand={brand}
          rating={Number(totalrating)}
        />
      </div>
    );
  });

  return data;
}
