import ProductCartModel from "../model/product.model.js";

  export const createCart = async (payload) => {
    try {
      let { user, productId } = payload.body;
     
  
      if ( !productId ||!user ) {
        throw Object.assign(new Error(), {
          name: "BAD_REQUEST",
          message: "Invalid Payload",
        });
      }
  
 
  
      const newCartData = {
        user: user,
        productId: productId,
        };
  
      let cart = await new ProductCartModel(newCartData).save();
      return { cart };
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };
  
  export const deleteCart = async (payload) => {
    try {
      const { _id } = payload.params;
  
      // handle validation here
  
      let data = await ProductCartModel.findByIdAndDelete(_id);
  
      return { data };
    } catch (error) {
      throw error;
    }
  };
  export const updateCart = async (payload) => {
    try {
      let data = await ProductCartModel.findByIdAndUpdate(payload.params, {
        $set: payload.body,
      })
      return { data };
    } catch (error) {
      throw error;
    }
  };
  
  export const fetchAllCart = async (payload) => {
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
       const cartsCount = await ProductCartModel.find().count()
       const cart = await ProductCartModel.find({})
            .sort({ createdAt: 'descending' })
            .lean()
            .limit(resultsPerPage)
            .skip(page * resultsPerPage)
            // console.log(posts)
       return {cart,cartsCount}
    }
    catch (error) {
        throw error;
    }
  };
  
  export const fetchCart = async (payload) => {
    try {
      // console.log(payload.params)
      const cart = await ProductCartModel.findById(payload.params)
      // .populate("user","Name");
      // console.log(getpost)
      return { cart };
    } catch (error) {
      throw error;
    }
  };
  
  const cartService = {
    createCart,
    updateCart,
    deleteCart,
    fetchAllCart,
    fetchCart,
  };
  
  export default cartService;
  