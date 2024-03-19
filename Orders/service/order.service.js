import ordersModel from "../models/order.model.js";

  export const createOrder = async (payload) => {
    try {
      let { user, shippingAddress,bill,products,status } = payload.body;
     
  console.log(payload.body)
      // if (!user || !shippingAddress ||!products || !bill || !status) {
      //   throw Object.assign(new Error(), {
      //     name: "BAD_REQUEST",
      //     message: "Invalid Payload",
      //   });
      // }

  
      const newOrderData = {
        user: user,
        shippingAddress: shippingAddress,
        bill: bill,
        products: products,
        status: status,
        };
  
      let order = await new ordersModel(newOrderData).save();
      return { order };
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };
  
  export const deleteOrder = async (payload) => {
    try {
      const { _id } = payload.params;
  
      // handle validation here
  
      let data = await ordersModel.findByIdAndDelete(_id);
  
      return { data };
    } catch (error) {
      throw error;
    }
  };
  export const updateOrder = async (payload) => {
    try {
      let data = await ordersModel.findByIdAndUpdate(payload.params, {
        $set: payload.body,
      });
      return { data };
    } catch (error) {
      throw error;
    }
  };
  
  export const fetchAllOrder = async (payload) => {
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
       const ordersCount = await ordersModel.find().count()
       const order = await ordersModel.find({})
            .sort({ createdAt: 'descending' })
            .lean()
            .limit(resultsPerPage)
            .skip(page * resultsPerPage)
            // console.log(posts)
       return {order,ordersCount}
    }
    catch (error) {
        throw error;
    }
  };
  
  export const fetchOrder = async (payload) => {
    try {
      // console.log(payload.params)
      const order = await ordersModel.findById(payload.params)
      // .populate("user","Name");
      // console.log(getpost)
      return { order };
    } catch (error) {
      throw error;
    }
  };
  
  const orderService = {
    createOrder,
    updateOrder,
    deleteOrder,
    fetchAllOrder,
    fetchOrder,
  };
  
  export default orderService;
  