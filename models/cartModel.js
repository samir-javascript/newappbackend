/*import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: { type: Number, default: 0 }
        }
    ]
}, {
    timestamps: true // Correct spelling: timestamps instead of timestapms
});

const CartModel = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
export default CartModel;
*/
