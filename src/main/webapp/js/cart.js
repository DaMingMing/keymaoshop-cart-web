var CART = {
	itemNumChange : function(){
		$(".increment").click(function(){//＋
			var _thisInput = $(this).siblings("input");
			_thisInput.val(eval(_thisInput.val()) + 1);
			//请求如果是html后缀且返回了Json对象。此时.html并不会解析该对象，会报错406。解决方法：请求改为.aciont后缀
			$.post("/cart/update/num/"+_thisInput.attr("itemId")+"/"+_thisInput.val() + ".action",function(data){
				CART.refreshTotalPrice();
			});
		});
		$(".decrement").click(function(){//-
			var _thisInput = $(this).siblings("input");
			if(eval(_thisInput.val()) == 1){
				return ;
			}
			_thisInput.val(eval(_thisInput.val()) - 1);
			//请求如果是html后缀且返回了Json对象。此时.html并不会解析该对象，会报错406。解决方法：请求改为.aciont后缀
			$.post("/cart/update/num/"+_thisInput.attr("itemId")+"/"+_thisInput.val() + ".action",function(data){
				CART.refreshTotalPrice();
			});
		});
		/*$(".itemnum").change(function(){
			var _thisInput = $(this);
			$.post("/service/cart/update/num/"+_thisInput.attr("itemId")+"/"+_thisInput.val(),function(data){
				CART.refreshTotalPrice();
			});
		});*/
	},
	refreshTotalPrice : function(){ //重新计算总价
		var total = 0;
		$(".itemnum").each(function(i,e){
			var _this = $(e);
			total += (eval(_this.attr("itemPrice")) * 10000 * eval(_this.val())) / 10000;
			//更新小计
			var a = _this.parent().parent().siblings(".pSubtotal").children(".totalprice").html();
            _this.parent().parent().siblings(".pSubtotal").children(".totalprice").html(new Number((eval(_this.attr("itemPrice")) * 10000 * eval(_this.val())) / 10000/100).toFixed(2)).priceFormat({ //价格格式化插件
                prefix: '¥',
                thousandsSeparator: ',',
                centsLimit: 2
            });

		});
		$("#allMoney2").html(new Number(total/100).toFixed(2)).priceFormat({ //价格格式化插件
			 prefix: '¥',
			 thousandsSeparator: ',',
			 centsLimit: 2
		});
	}
};

$(function(){
	CART.itemNumChange();
});