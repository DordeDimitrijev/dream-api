import { connect } from "mongoose";

export const connectDB = () => 
{ return connect('mongodb://localhost/dream_api', { useNewUrlParser: true, useUnifiedTopology: true }) }
