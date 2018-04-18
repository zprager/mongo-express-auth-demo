

module.exports = function( err, rows ){

  //determin TOTAL of fund from BW sheet
var totalFundValue  =  rows.map(function(item, index){
       if(index === 0 || typeof item._cokwr == 'undefined')
       {//do nothing, it is the header
         //skip undefined coins too
         return 0;
       }
       else
       {
       console.log("coin name **********************\n ",item._cokwr);
       //console.log("number of coin \n ",item._ciyn3);
       //console.log("item value", item._d415a);f
       if(typeof item._d415a !== 'undefined' && item._d415a.includes('-') == false)
       {
         //console.log("item value passed test", item._d415a);
         var totalValue = item._d415a.split("$")[1].replace(',', '');
         totalValue = parseInt(totalValue);
         //console.log("TOTAL VALUE OF COINS", totalValue);
         if(isInt(totalValue))
         {
           console.log('returned value is ',totalValue);
         return totalValue;
       }
       else{return false;}
      }
      else
      {
      //  var totalValue = 0;
        return false;
      }
       //console.log("total value of coins \n ",totalValue);
       }//END INDEX == 0
      //console.log(item.coinname+'\n'+item.blockwaterid+'\n'+item.coinabbreviation);
  }).reduce(reducer);//END .MAP
  console.log("################# \n fund total ", fundValue);
//  return totalFundValue;
};
