const dateFormater = (date)=>{
    const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateArray = date.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
}
export default dateFormater