package com.singulax.flow.web.constant;

public class CurrencyUtils {
	
	private static final int CURRENCY_PROPORTION = 100;   ////金额兑换积分的比例 1:100
	
	public static double moneyToCurrency(double money){
		return money*CURRENCY_PROPORTION;
	}
}
