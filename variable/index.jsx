import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";



function DefaulVariable(){

    
    const local = JSON.parse(localStorage.getItem('persist:root'));
    var token;
    var author;

    if(local){
        token = local.authen.replace(/['"]+/g, '');
        author = atob(local.author.replace(/['"]+/g, ''));
    }
    const history = useHistory();
    const dispatch = useDispatch();


    const data = {};
    data.token = token;
    data.history =history
    data.dispatch=dispatch;
    data.author = author;
    

    return data
}

export default DefaulVariable