import React, {Component} from "react";
import '../common/public.css';
import {$tv} from 'react-tv-focusable'


class TvFocusable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 2,
            disActive: 0,
            keysActive:  1,
            focusClassNameActive:  1,
            offsetActive:1
        }
    }
    

    componentDidMount() {
        $tv.init({
            focusableClassName:'r-focusable', // 必须配置项
        })
        this.focusclassname1();
    }

    componentWillUnmount() {
        // 如果没设置全局配置，可以直接调用reset()方法
        $tv.reset(); // 将所有的配置项还原成ng-tv-focusable的默认配置
        /** 
         * 也可以单独重置某个属性，例如
         * 重置focusClassName  => $tv.resetFocusClassName();
         * 重置KEYS =>  $tv.resetKEYS();
         * 重置initDis =>  $tv.resetInitDis();
         * 重置findFocusType =>  $tv.resetFindFocusType();
         * */ 
        

        // 如果在app.modules.ts中有全局的配置那么，此处就需要还原成全局配置
        /**
         $tv.init({
            focusClassName: "config-focus", // 聚焦元素的className （默认focus）
            KEYS: {KEY_LEFT: [37], KEY_UP: [38], KEY_RIGHT: [39], KEY_DOWN: [40]}, // 自定义键值
            findFocusType: 1, //找焦点方式 0：直线上 1：最近（默认1） 
            initDis: 20 // 只有当findFocusType为0时才会生效，直线类型找焦点时，按键方向的交叉轴方向允许的最大找焦点范围,（默认20px）
        })
        */
    }

    event(index) {
        alert(index);
    }
    
    /**
     * findFocusType：找焦点方式 
     * 0：直线上 
     * 1：最近（默认1）
     */
    type1() {
        this.setState({active:1})
        $tv.init({ findFocusType: 0}); // 0：直线上最近的 
    }
    
    type2() {
        this.setState({active:2})
        $tv.init({ findFocusType: 1});  // 0：上线左右距离最近的div
    }
    
    /**
     * initDis:
     * 直线类型找焦点时，按键方向的交叉轴方向允许的最大找焦点范围,
     * 设置initDis的前提是findFocusType为0
     * div2偏离水平线30个像素，initDis设置29是找不到div2的，此时可以设置大于29的值,就可以让div2获取焦点
     */
    dis1() {
        this.setState({disActive:1})
        this.setState({active:1})

        $tv.init({ findFocusType: 0, initDis: 30}); //  设置大于29的值,就可以让div2获取焦点
    }
    
    dis2() {
        this.setState({disActive:2})
        this.setState({active:1})

        $tv.init({ findFocusType: 0, initDis: 29}); //  设置29是找不到div2的
    }
    
    /**
     * KEYS: 自定义键值
     *  --KEY_UP: 上移时候的键值,
     * --KEY_RIGHT: 右移时候的键值
     * --KEY_DOWN: 下移时候的键值
     * --KEY_LEFT: 左移时候的键值 
     * --KEY_ENTER: 触发clicl事件的键值
     */
    keys1() {
        this.setState({keysActive:1})

        $tv.init({ 
        KEYS: {
            KEY_LEFT: [65, 37], // 65:A  37:←
            KEY_UP: [87, 38], // 87:W  38:↑
            KEY_RIGHT: [68, 39], // 68:D   39:→
            KEY_DOWN: [83, 40], // 83：S  40:↓
            KEY_ENTER: [80, 13], // 32: P  13：enter键
        }
        });
    }
    
    keys2() {
        this.setState({keysActive:2})

        $tv.init({ 
            KEYS: {
                KEY_LEFT: [90], // Z
                KEY_UP: [88], // X
                KEY_RIGHT: [67], // C
                KEY_DOWN: [86], // V
                KEY_ENTER: [66], // B
            }
        });
    }
    
    /**
     * focusClassName: 自定义获取焦点的classname
     */
    focusclassname1() {
        this.setState({focusClassNameActive:1})
        this.toggleClass(document.getElementsByClassName('ng-focus-rotate')[0], 'ng-focus-rotate')
        $tv.init({
        focusClassName: "ng-focus-scale", 
        });
    }
    
    focusclassname2() {
        this.setState({focusClassNameActive:2})
        this.toggleClass(document.getElementsByClassName('ng-focus-scale')[0], 'ng-focus-scale')
    
        $tv.init({
            focusClassName: "ng-focus-rotate",
        });
    }

    offsetDistance1() {
        this.setState({offsetActive:1})
    
        $tv.init({
            offsetDistance: 50,
        });
    }
    
    offsetDistance2() {
        this.setState({offsetActive:2})
    
        $tv.init({
            offsetDistance: 250,
        });
    }
    
    toggleClass(el, className){
        if(!el) {return;}
        return el.classList.toggle(className)
    };
    
   
    render(){
        let lists = [];
        for(let i=0;i< 105;i++) {
            lists.push(<span 
                onClick={() => this.event(i+1)}
                className="span r-focusable"
                key={i}>{i+1}</span>)
        }

        return (
            <div className="example4">
               <div>
                    <div className="title">修改findFocusType(主要体现在div2上)</div><br/>
                    <span className={this.state.active===1?'active btn':'btn'} onClick={() => this.type1()}>优先直线</span> 
                    <span className={this.state.active===2?'active btn':'btn'} onClick={() => this.type2()}>优先最近</span> 
                </div><br/>
                <div>
                    <div className="title">修改initDis(主要体现在div2上)</div><br/>
                    <span className={this.state.disActive===1?'active btn':'btn'} onClick={() => this.dis1()}>initDis 30px</span> 
                    <span className={this.state.disActive===2?'active btn':'btn'} onClick={() => this.dis2()}>initDis 29px</span> 
                </div><br/>
                <div>
                    <div className="title">修改KEYS</div><br/>
                    <span className={this.state.keysActive===1?'active btn':'btn'} onClick={() => this.keys1()}>A(左)/W(上)/D(右)/S(下)/PonClick</span> 
                    <span className={this.state.keysActive===2?'active btn':'btn'} onClick={() => this.keys2()}>Z(左)/X(上)/C(右)/V(下)/BonClick</span>  
                </div><br/>
                <div>
                    <div className="title">修改选中的classname的样式</div><br/>
                    <span className={this.state.focusClassNameActive===1?'active btn':'btn'} onClick={() => this.focusclassname1()}>scale</span>
                    <span className={this.state.focusClassNameActive===2?'active btn':'btn'} onClick={() => this.focusclassname2()}>rotate</span>
                </div>
                <div>
                    <div className="title">修改offsetDistance</div><br/>
                    <span className={this.state.offsetActive===1?'active btn':'btn'} onClick={() => this.offsetDistance1()}>offsetDistance = 50</span>
                    <span className={this.state.offsetActive===2?'active btn':'btn'} onClick={() => this.offsetDistance2()}>offsetDistance = 250</span>
                </div>
                <div className="demo" style={{paddingTop:'100px'}}> {lists}</div>
            </div>
        )
    }
}


export default TvFocusable;
