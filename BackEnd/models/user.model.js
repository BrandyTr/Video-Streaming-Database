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
        default:"",
        required:true,
    },
    image: {
		type: String,
		default: "",
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