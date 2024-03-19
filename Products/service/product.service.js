import productModel from "../models/product.model.js";

export const createProduct = async (payload) => {
  try {
    let { sellerId, productName,quantity,price,description ,productImage,category} = payload.body;
   
 console.log(payload.body)
    if (!sellerId || !productName ||!quantity || !price || !category ) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Invalid Payload",
      });
    }

    const files = payload.files;

    const image1 = files?.image1 && (files?.image1[0]?.path || null);
    const image2 = files?.image2 && (files?.image2[0]?.path || null);
    const image3 = files?.image3 && (files?.image3[0]?.path || null);
    const image4 = files?.image4 && (files?.image4[0]?.path || null);

    const newProductData = {
      sellerId: sellerId,
      productName: productName,
      description: description,
      category: category,
      price: price,
      productImage: [image1, image2, image3, image4].filter(Boolean),
    };

    let product = await new productModel(newProductData).save();
    return { product };
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const deleteProduct = async (payload) => {
  try {
    const { _id } = payload.params;

    // handle validation here

    let data = await productModel.findByIdAndDelete(_id);

    return { data };
  } catch (error) {
    throw error;
  }
};
export const updateProduct = async (payload) => {
  try {
    let data = await productModel.findByIdAndUpdate(payload.params, {
      $set: payload.body,
    })
    console.log(data)
    return { data };
  } catch (error) {
    throw error;
  }
};

export const fetchAllProducts = async (payload) => {
  // try {

  // //     // handle validation

  // //     // console.log(payload.body)
  //     const page = payload.query
  //     console.log(payload.query)
  //     console.log("hdugduw---------->>>>>",page)
  //     const query = skip(5).limit(5);
  //     const posts = await postModel.find({query}).populate('userid',"email")

  //     console.log("posts------>>>>",posts)
  //     return { posts };
  // }
  // catch (error) {
  //     throw error;
  // }
  // try {
  //   const page = payload.query.page || 1;
  //   // const limit = payload.query.limit || 5;
  //   const skips = (page - 1) * 2;
  //   const query = skip(5).limit(5);
  //   // const postCount = postModel.countDocuments();
  //   // if (req.query.page) {
  //   //   console.log(postCount);
  //   //   if (skip >= postCount) {
  //   //     throw new Error("this page is not found");
  //   //   }
  //   // }
  //   const posts = await postModel
  //     .find(query)
  //     .populate("userid", "email")
  //     // .limit(2)
  //     .sort({ createdAt: -1 });
  //   return posts;
  // } catch (error) {
  //   console.log(error)
  //   throw error;
  // }

  try {
    // console.log("HELLO",payload.user._id )
    console.log("payload------>>>>",payload.query)
      let page = Number(payload.query.page) ;
      let resultsPerPage = 2;
      console.log("PAGESS",page)
      // if(!page || page.trim() === '') {
      //   page = 0;
      // }
     const productsCount = await productModel.find().count()
     const product = await productModel.find({})
          .sort({ createdAt: 'descending' })
          // .populate('userid',"email firstName lasName")
          .lean()
          .limit(resultsPerPage)
          .skip(page * resultsPerPage)
          // console.log(posts)
     return {product,productsCount}
  }
  catch (error) {
      throw error;
  }
};

export const fetchProduct = async (payload) => {
  try {
    // console.log(payload.params)
    const product = await productModel.findById(payload.params)
    // .populate("user","Name");
    // console.log(getpost)
    return { product };
  } catch (error) {
    throw error;
  }
};

const productService = {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProduct,
};

export default productService;
