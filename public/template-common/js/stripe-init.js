window.stripe_info={stripe_public_key:'pk_live_51LfbvJCq4TXnXNHR6Aj3IEkn2qcvutkkm3w1ZWhd4oikkUZ2txwjYDbz3equEaTCuoDbRuOUkjzoxtcXc2EhJt8s006rpEvBti',stripe_shoes_key:'pk_live_51Lkl1qFEOCuM3dOKP0SM9uuFcjWzirRFLOvBSX2Zj9b8IZ9HV2G5dEVVkWbmzWsthY68pfEDgBpZaGJAwVpSpgZq00YVz8aPiy',stripe_topgadgetlife_key:'pk_live_51OFeZ4Isczb5jYQxI5NiAvvWbRFVWgaPoLmSQ83LW190ny5aNelskeEZpwX7SyYPK4UKVn8hljihrIGqEqn1tzwL00biVuGOoY',stripe_sherem_key:'pk_live_51OEoEnDuEDNJuKDENLKu0kzAeN5NkUPHSnMaz5qGAgwQcCJWEND1kVuJPHBex2jFdsEBjSvBneo6Yr6a0f6OySuc00unnL0CKf',stripe_acc_info:{default:{key:'stripe_public_key'},shoes:{key:'stripe_shoes_key'},topgadgetlife:{key:'stripe_topgadgetlife_key'},sherem:{key:'stripe_sherem_key'},},stripe_acc_key:'stripe_public_key',}
function stripeInit(render_id_suffix){if(!render_id_suffix){render_id_suffix='';}
let chain_payment_status=render_id_suffix=='-popup'?1:0;;console.log(window.stripe_info[window.stripe_info.stripe_acc_key]);window.stripe=Stripe(window.stripe_info[window.stripe_info.stripe_acc_key]);window.card_number_vaild=false;window.card_expriy_vaild=false;window.card_cvc_vaild=false;let elements=this.stripe.elements();let style={base:{color:"#32325d",fontFamily:'AvenirNext-Demi',fontSmoothing:"antialiased",fontSize:"16px","::placeholder":{color:"#9b9b9b"}},invalid:{color:"#fa755a",iconColor:"#fa755a"}};window.cardNumber=elements.create("cardNumber",{style:style,hidePostalCode:true});window.cardExpiry=elements.create("cardExpiry",{style:style,hidePostalCode:true});window.cardCvc=elements.create("cardCvc",{style:style,hidePostalCode:true});cardNumber.on('change',function(event){window.card_number_vaild=false;window.card_number_error=true;if(!event.error){if(event.empty){window.card_number_error=false;}
if(event.complete){window.card_number_error=false;window.card_number_vaild=true;checkoutCardErrorChange(chain_payment_status);}}});cardNumber.on('blur',function(event){checkoutCardErrorChange(chain_payment_status);});cardExpiry.on('change',function(event){window.card_expriy_vaild=false;window.card_expriy_error=true;if(!event.error){if(event.empty){window.card_expriy_error=false;}
if(event.complete){window.card_expriy_error=false;window.card_expriy_vaild=true;checkoutCardErrorChange(chain_payment_status);}}});cardExpiry.on('blur',function(event){checkoutCardErrorChange(chain_payment_status);});cardCvc.on('change',function(event){window.card_cvc_vaild=false;window.card_cvc_error=true;if(!event.error){if(event.empty){window.card_cvc_error=false;}
if(event.complete){window.card_cvc_error=false;window.card_cvc_vaild=true;checkoutCardErrorChange(chain_payment_status);}}
checkoutCardErrorChange(chain_payment_status);});cardCvc.on('blur',function(event){checkoutCardErrorChange(chain_payment_status);});cardNumber.mount("#card-number-stripe"+render_id_suffix);cardExpiry.mount("#card-expiry-stripe"+render_id_suffix);cardCvc.mount("#card-cvc-stripe"+render_id_suffix);}
function checkoutCardErrorChange(chain_payment_status){if(window.card_cvc_error||window.card_expriy_error||window.card_number_error){$('#checkout-card-error').show();$('#stripe-card-popup-error').show();}else{$('#checkout-card-error').hide();$('#stripe-card-popup-error').hide();}
if(window.card_number_vaild&&window.card_expriy_vaild&&window.card_cvc_vaild){$('#checkout-error').hide();var params=getOrderParams('stripe',chain_payment_status,true);if(params.error&&params.error.length){$('#checkout-error').html(params.error.join('<br />'));$('#checkout-error').show();}}}
function stripeCreateOrderBefore(callback,params,errorcallback){createRadarSession(callback,params,errorcallback);}
function createRadarSession(callback,params,errorcallback){window.stripe.createRadarSession().then(function(result){var stripe_radar_session='';if(result.error){console.error(result.error);}else{stripe_radar_session=result.radarSession.id;}
createPaymentMethod(callback,params,errorcallback,stripe_radar_session);});}
function createPaymentMethod(callback,params,errorcallback,stripe_radar_session){var billing_details={name:params.first_name+' '+params.second_name,email:params.email,phone:params.phone_full,address:{country:params.country,city:params.city,line1:params.address,postal_code:params.code,state:params.province}}
window.stripe.createPaymentMethod({type:'card',card:cardNumber,billing_details:billing_details,}).then(function(result){if(result.error){errorcallback(result.error.message);console.log(result.error);}else{callback({stripe_radar_session:stripe_radar_session,payment_method_id:result.paymentMethod.id,return_url:window.location.protocol+'//'+window.location.host+'/template-common/en/stripe-3ds-complete/'},'stripe_extra_info','stripe');}})}
function retrievePaymentIntent(client_secret,callback,errorback){$('#loading').show();stripe.retrievePaymentIntent(client_secret).then(function(result){$('#loading').hide();if(result.error){errorback(result.error.message);}else{if(result.paymentIntent.status==='succeeded'){callback();}else if(result.paymentIntent.status==='requires_payment_method'){errorback();}}});}
function getStripeIframeSizeByCurrentWidth(){var body_width=document.body.clientWidth;if(body_width<410){return{width:250,height:400};}else if(body_width<520){return{width:390,height:400};}else if(body_width<620){return{width:500,height:600};}else{return{width:600,height:400};}}
function create3DSPopup(url){var iframe_size=getStripeIframeSizeByCurrentWidth();var width=iframe_size.width;var height=iframe_size.height;var stripe_3ds_container=document.getElementById('stripe-3ds-container');stripe_3ds_container.innerHTML='';stripe_3ds_container.style.width=width;stripe_3ds_container.style.height=height;var iframe=document.createElement('iframe');iframe.src=url;iframe.width=width;iframe.height=height;stripe_3ds_container.appendChild(iframe);$('#loading').hide();document.getElementById('stripe-3ds-popup').style.display='block';}
function onStripe3DSComplete(onStripe3DSComplete,callback,errorback){document.getElementById('stripe-3ds-popup').style.display='none';retrievePaymentIntent(onStripe3DSComplete,callback,errorback);}
function stripeElementsInit(clientSecret,params,render_id){if(!render_id){render_id='pay-after-warpper';}
window.stripe=Stripe(window.stripe_info[window.stripe_info.stripe_acc_key]);window.stripe_info['elements']=stripe.elements({clientSecret});var paymentElement=window.stripe_info.elements.create("payment",{defaultValues:{billingDetails:{name:params.name,email:params.email,address:{country:params.country,state:params.state,postal_code:params.code,line1:params.address,city:params.city}}},paymentMethodOrder:['card','sofort','giropay']});paymentElement.mount("#"+render_id);}
function stripeElementSubmit(params,callback){try{window.stripe&&window.stripe.confirmPayment&&window.stripe.confirmPayment({elements:window.stripe_info.elements,confirmParams:{return_url:params.return_url},shipping:{address:{city:params.city,country:params.country,line1:params.address,state:params.state,},name:params.name,}}).then(function(result){callback(result);}).catch(function(err){callback(err);})}catch(error){callback(error);}}
function changeStripeAcc(stripe_acc){if(stripe_acc){window.stripe_info.stripe_acc_key=window.stripe_info.stripe_acc_info[stripe_acc].key;}}