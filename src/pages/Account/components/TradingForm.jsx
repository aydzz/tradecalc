import React, { useEffect, useState } from 'react'
import TradeSetting, {NullTradeSetting} from '../../../server/models/TradeSetting'
import tradeSettingService from '../../../server/service/TradeSettingService';
import userService from '../../../server/service/UserService';
import {Toast} from "../../../assets/theme/utils/swal"
import { useAuth } from '../../../contexts/AuthContext';
import User from '../../../server/models/User';
import OverlayLoader from '../../../components/Loaders/OverlayLoader';
import appLogger from '../../../assets/js/AppLogger';
import { Form, Formik } from 'formik';
import * as Yup from "yup"
import { inputValidationString } from '../../../assets/js/Functions';

export default function TradingForm(props) {
    /**@type {[TradeSetting, Function]} */
    const [tradeSetting, setTradeSetting] = useState(new NullTradeSetting());
    
    /**@type {[User, Function]} */
    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true);
    const {currentUser} = useAuth();
    const [error, setError] = useState();
    /**EFFECT: Fetch User Setting and User Detail */
    useEffect(function(){
        userService.getBy("uid",currentUser.uid).then(function(res){
            const user = res[0];
            setUser(user);
            tradeSettingService.getBy("uid",user.uid).then(function(res){
                if(!res){
                    appLogger.warn("APP: No settings for the current user yet");
                }else{
                    if(res.length > 1){
                        appLogger.warn("APP Multiple settings found for current user.");
                    }else{
                        const setting = res[0];
                        setting.userID = user.id;
                        tradeSetting.id = setting.id;
                        setTradeSetting(setting);
                    }
                }
                setLoading(false);
            }).catch((error)=>{
                setError(error);

            })   
        }).catch((error)=>{
            setError(error);
            setLoading(false);
        })
    },[]);    
    useEffect(function(){
        if(error){
            throw error;
        }
    },[error])
    const submitHandler = function(values, {resetForm, ...rest}){
        console.log(values);
        console.log(rest);
        tradeSetting.userID = user.id;
        tradeSetting.uid = currentUser.uid;
        tradeSettingService.save(tradeSetting).then(function(res){
            Toast.fire({
                title: "Settings Updated",
                icon: "success"
            });
            resetForm();
        }).catch(function(e){
            Toast.fire({
                title: "Error",
                text: "There was an error updating your settings",
                icon: "error"
            })
            resetForm();
        })
    }
    

    if(loading){
        return(
            <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
                <OverlayLoader type="loading-6"/> 
            </div>
        )
    }
  return (
    <Formik
        initialValues={{
            portfolioValue: tradeSetting.portfolioValue,
            realizedPnL: tradeSetting.realizedPnL,
            tradeCapital: tradeSetting.tradeCapital,
            leverage: tradeSetting.leverage,
            range: tradeSetting.range,
            rangeMultiplier: tradeSetting.rangeMultiplier,
            riskScope: tradeSetting.riskScope,
            riskDeviationPercent: tradeSetting.riskDeviationPercent,
            acceptableSpread: tradeSetting.acceptableSpread,
            minSpread: tradeSetting.minSpread,
            portRiskTradingThreshold: tradeSetting.portRiskTradingThreshold,
            capRiskTradingThreshold: tradeSetting.capRiskTradingThreshold,
            capPortRiskPercent: tradeSetting.capPortRiskPercent,
            riskRewardMultiplier: tradeSetting.riskRewardMultiplier
        }}
        validationSchema={Yup.object({
            portfolioValue: 
            Yup.number()
                .required("This field is required.")
                .positive("This field must be a positive number."), 
            realizedPnL: 
                Yup.number()
                .required("This field is required.")
                .min(0),
            tradeCapital: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number."),
            leverage: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number.")
                    .integer(),
            range: 
                Yup.number()
                    .required("This field is required.")
                    .min(5)
                    .positive(),
            rangeMultiplier: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number."),
            riskScope:
                Yup.string()
                    .required("This field is required."),
            riskDeviationPercent: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number."),
            acceptableSpread: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number."),
            minSpread: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number."),
            portRiskTradingThreshold: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number."),
            capRiskTradingThreshold: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number."),
            capPortRiskPercent: 
                Yup.number()
                    .required("This field is required.")
                    .min(0),
            riskRewardMultiplier: 
                Yup.number()
                    .required("This field is required.")
                    .positive("This field must be a positive number.")
        })}
        onSubmit={submitHandler}
    >
        {function(formik){
            return(
                <Form className="form-horizontal">
                    <h5 className="lead mb-3">ACCOUNT/PLATFORM PARAMETERS <i className='float-right p-1 bi bi-gear'></i></h5>
                    <hr></hr>
                    
                    <div className="form-group row">
                        <label htmlFor="portfolioValue" className="col-lg-3 col-12 col-form-label">Portfolio Value</label>
                        <div className="col-lg-9 col-12">
                        <input type="number" className={`form-control ${inputValidationString(formik,"portfolioValue")}`} placeholder="Enter current Portfolio Value"
                            name="portfolioValue"
                            {...formik.getFieldProps("portfolioValue")}
                            value={tradeSetting.portfolioValue}
                            onChange={(e)=>{
                                const fieldProps = formik.getFieldProps("portfolioValue")
                                fieldProps.onChange(e);
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.portfolioValue = Number(e.target.value);
                                setTradeSetting(newTradeSetting);
                            }}
                        />
                        <small className='text-danger'>{formik.errors.portfolioValue ? formik.errors.portfolioValue: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-12 col-form-label">Realized Profit/Loss</label>
                    <div className='col-lg-9 col-12'>
                        <div className="input-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-calculator"></i>
                            </span>
                            </div>
                            <input type="number" 
                                className={`form-control ${inputValidationString(formik,"realizedPnL")}`}
                                placeholder="Realized Profit/Loss" 
                                name="realizedPnL"
                                {...formik.getFieldProps("realizedPnL")}
                                value={Number(tradeSetting.realizedPnL).toFixed(2)} 
                                readOnly={true}
                            />
                            <small className='text-danger'>{formik.errors.realizedPnL ? formik.errors.realizedPnL: "" }</small>
                        </div>
                    </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-lg-3 col-12 col-form-label">Trade Capital</label>
                        <div className="col-lg-9 col-12">
                        <input 
                            type="number" 
                            className={`form-control ${inputValidationString(formik,"tradeCapital")}`} 
                            placeholder="Enter current Trade Capital" 
                            name="tradeCapital"
                            {...formik.getFieldProps("tradeCapital")}
                            value={tradeSetting.tradeCapital} 
                            onChange={(e)=>{
                                formik.getFieldProps("tradeCapital").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.tradeCapital = Number(e.target.value);
                                setTradeSetting(newTradeSetting);
                            }}    
                        />
                        <small className='text-danger'>{formik.errors.tradeCapital ? formik.errors.tradeCapital: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-12 col-form-label">Trade-Portfolio Capital</label>
                    <div className='col-lg-9 col-12'>
                        <div className="input-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-calculator"></i>
                            </span>
                            </div>
                            <input 
                                type="number" 
                                className={`form-control ${inputValidationString(formik,"tradePortCapital")}`}
                                placeholder="Unable to calculate value." 
                                name="tradePortCapital"
                                {...formik.getFieldProps("tradePortCapital")}
                                value={Number(tradeSetting.tradePortCapital).toFixed(2)} 
                                readOnly/>
                                <small className='text-danger'>{formik.errors.tradePortCapital ? formik.errors.tradePortCapital: "" }</small>
                        </div>
                    </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Leverage</label>
                        <div className="col-lg-9 col-12">
                        <input 
                            type="number" 
                            className={`form-control ${inputValidationString(formik,"leverage")}`}
                            placeholder="Enter Leverage" 
                            name="leverage"
                            {...formik.getFieldProps("leverage")}
                            value={tradeSetting.leverage}
                            onChange={(e)=>{
                                formik.getFieldProps("leverage").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.leverage = Number(e.target.value);
                                setTradeSetting(newTradeSetting);
                            }}    
                        />
                        <small className='text-danger'>{formik.errors.leverage ? formik.errors.leverage: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Range</label>
                        <div className="col-lg-9 col-12">
                        <input 
                            type="number" 
                            className={`form-control ${inputValidationString(formik,"range")}`}
                            placeholder="Enter current Market Range" 
                            name="range"
                            {...formik.getFieldProps("range")}
                            value={tradeSetting.range}
                            onChange={(e)=>{
                                formik.getFieldProps("range").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.range = Number(e.target.value);
                                setTradeSetting(newTradeSetting);
                            }}    
                        />
                        <small className='text-danger'>{formik.errors.range ? formik.errors.range: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Range Multiplier</label>
                        <div className="col-lg-9 col-12">
                        <input type="number" 
                            className={`form-control ${inputValidationString(formik,"rangeMultiplier")}`}
                            placeholder="Enter your Range Multiplier" 
                            name="rangeMultiplier"
                            {...formik.getFieldProps("rangeMultiplier")}
                            value={tradeSetting.rangeMultiplier}
                            onChange={(e)=>{
                                formik.getFieldProps("rangeMultiplier").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.rangeMultiplier = Number(e.target.value);
                                setTradeSetting(newTradeSetting);
                            }} 
                        />
                        <small className='text-danger'>{formik.errors.rangeMultiplier ? formik.errors.rangeMultiplier: "" }</small>
                        </div>
                    </div>
                    
                    <h5 className="lead mb-3 mt-4">GENERAL RISK MANAGEMENT PARAMETERS <i className='float-right p-1 bi bi-gear'></i></h5>
                    <hr></hr>

                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Risk Scope</label>
                        <div className="col-lg-9 col-12">
                        <select 
                            className={`form-control ${inputValidationString(formik,"riskScope")}`}
                            name="riskScope"
                            {...formik.getFieldProps("riskScope")}
                            value={tradeSetting.riskScope}
                            onChange={(e)=>{
                                formik.getFieldProps("riskScope").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.riskScope = e.target.value;
                                setTradeSetting(newTradeSetting);
                            }} 
                        >
                            <option value="portfolio">PORTFOLIO</option>
                            <option value="capital">CAPITAL</option>
                        </select>
                        <small className='text-danger'>{formik.errors.riskScope ? formik.errors.riskScope: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Risk Deviation %</label>
                        <div className="col-lg-9 col-12">
                        <input type="number" 
                            className={`form-control ${inputValidationString(formik,"riskDeviationPercent")}`}
                            placeholder="Enter Risk Deviation %" 
                            name="riskDeviationPercent"
                            {...formik.getFieldProps("riskDeviationPercent")}
                            value={tradeSetting.riskDeviationPercent*100}
                            onChange={(e)=>{
                                formik.getFieldProps("riskDeviationPercent").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.riskDeviationPercent = Number(e.target.value)/100;
                                setTradeSetting(newTradeSetting);
                            }} 
                            min={0} max={100}/>
                            <small className='text-danger'>{formik.errors.riskDeviationPercent ? formik.errors.riskDeviationPercent: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Acceptable Spread</label>
                        <div className="col-lg-9 col-12">
                        <input 
                            type="number" 
                            className={`form-control ${inputValidationString(formik,"acceptableSpread")}`}
                            placeholder="Enter Acceptable Spread" 
                            name="acceptableSpread"
                            {...formik.getFieldProps("acceptableSpread")}
                            value={tradeSetting.acceptableSpread} 
                            onChange={(e)=>{
                                formik.getFieldProps("acceptableSpread").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.acceptableSpread = Number(e.target.value);
                                setTradeSetting(newTradeSetting);
                            }}     
                        />
                        <small className='text-danger'>{formik.errors.acceptableSpread ? formik.errors.acceptableSpread: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Minimum Spread</label>
                        <div className="col-lg-9 col-12">
                        <input type="number" 
                            className={`form-control ${inputValidationString(formik,"minSpread")}`}
                            placeholder="Enter Minimum Spread" 
                            name="minSpread"
                            {...formik.getFieldProps("minSpread")}
                            value={tradeSetting.minSpread} 
                            onChange={(e)=>{
                                formik.getFieldProps("minSpread").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.minSpread = Number(e.target.value);
                                setTradeSetting(newTradeSetting);
                            }} 
                            
                        />
                        <small className='text-danger'>{formik.errors.minSpread ? formik.errors.minSpread: "" }</small>
                        </div>
                    </div>
                    
                    <h5 className="lead mb-3 mt-4">RISK PARAMETERS <i className='float-right p-1 bi bi-gear'></i></h5>
                    <hr></hr>

                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Portfolio Risk Trading Threshold</label>
                        <div className="col-lg-9 col-12">
                        <input type="number" 
                            className={`form-control ${inputValidationString(formik,"portRiskTradingThreshold")}`}
                            placeholder="Enter Portfolio Risk Trading Threshold" 
                            name="portRiskTradingThreshold"
                            {...formik.getFieldProps("portRiskTradingThreshold")}
                            value={tradeSetting.portRiskTradingThreshold*100} 
                            onChange={(e)=>{
                                formik.getFieldProps("portRiskTradingThreshold").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.portRiskTradingThreshold = Number(e.target.value)/100;
                                setTradeSetting(newTradeSetting);
                            }} 
                            min={0} max={100}/>
                            <small className='text-danger'>{formik.errors.portRiskTradingThreshold ? formik.errors.portRiskTradingThreshold: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Capital Risk Trading Threshold</label>
                        <div className="col-lg-9 col-12">
                        <input type="number" className={`form-control ${inputValidationString(formik,"capRiskTradingThreshold")}`} placeholder="Enter Capital Risk Trading Threshold" 
                            name="capRiskTradingThreshold"
                            {...formik.getFieldProps("capRiskTradingThreshold")}
                            value={tradeSetting.capRiskTradingThreshold*100} 
                            onChange={(e)=>{
                                formik.getFieldProps("capRiskTradingThreshold").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.capRiskTradingThreshold = Number(e.target.value)/100;
                                setTradeSetting(newTradeSetting);
                            }} 
                            min={0} max={100}/>
                            <small className='text-danger'>{formik.errors.capRiskTradingThreshold ? formik.errors.capRiskTradingThreshold: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-12 col-form-label">Capital-Portfolio Risk %</label>
                    <div className='col-lg-9 col-12'>
                        <div className="input-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-calculator"></i>
                            </span>
                            </div>
                            <input 
                                type="number" 
                                className={`form-control ${inputValidationString(formik,"capPortRiskPercent")}`}
                                placeholder="Unable to calculate value." 
                                name="capPortRiskPercent"
                                {...formik.getFieldProps("capPortRiskPercent")}
                                value={Number(tradeSetting.capPortRiskPercent).toFixed(2)*100} readOnly/>
                        </div>
                        <small className='text-danger'>{formik.errors.capPortRiskPercent ? formik.errors.capPortRiskPercent: "" }</small>
                    </div>
                    </div>
                    <h5 className="lead mb-3 mt-4">REWARD PARAMETERS <i className='float-right p-1 bi bi-gear'></i></h5>
                    <hr></hr>

                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-lg-3 col-12 col-form-label">Risk to Reward Multiplier</label>
                        <div className="col-lg-9 col-12">
                        <input type="number" className={`form-control ${inputValidationString(formik,"riskRewardMultiplier")}`} placeholder="Enter Risk to Reward Multiplier" 
                            name="riskRewardMultiplier"
                            {...formik.getFieldProps("riskRewardMultiplier")}
                            value={tradeSetting.riskRewardMultiplier} 
                            onChange={(e)=>{
                                formik.getFieldProps("riskRewardMultiplier").onChange(e)
                                const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                                newTradeSetting.riskRewardMultiplier = Number(e.target.value);
                                setTradeSetting(newTradeSetting);
                            }} 
                        />
                        <small className='text-danger'>{formik.errors.riskRewardMultiplier ? formik.errors.riskRewardMultiplier: "" }</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="offset-sm-3 col-lg-9 col-12">
                        <button type="submit" className={`btn btn-danger ${!formik.isValid ? "disabled" : ""}`}>Update Settings</button>
                        </div>
                    </div>
                </Form>
            )
        }}
    </Formik>
    
  )
}
