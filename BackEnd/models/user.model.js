const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:function() {
            // Only require a password if it's not a Google account
            return !this.isGoogleAccount;
        },
    },
    role:{
        type:String,
        default:"user"
    },
    image: {
		type: String,
		default: "",
	},
    isGoogleAccount:{
        type:Boolean,
        default:false,
    },
    ratings: {
        type: [
            {
                movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
                rate: { type: Number }
            }
        ],
        default: []
    },
    searchHistory:{
        type:[{
            type:Object,
            default:[]
        }]
    },
    favoriteMovies:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'Movie',
            default:[]
        }]
    },
    viewHistory:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'Movie',
            default:[]
        }]
    },
})
const User=mongoose.model('User',userSchema)
module.exports=User