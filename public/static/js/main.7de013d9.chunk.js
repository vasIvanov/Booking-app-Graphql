(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{21:function(e,t,n){e.exports=n(56)},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(16),l=n.n(r),c=(n(26),n(1)),i=(n(27),n(9)),s=n(2),u=(n(28),o.a.createContext({token:null,userId:null,login:function(e,t,n){},logout:function(){}})),m=function(){var e=Object(a.useState)(""),t=Object(c.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(""),i=Object(c.a)(l,2),s=i[0],m=i[1],d=Object(a.useState)(!0),f=Object(c.a)(d,2),p=f[0],h=f[1],E=Object(a.useContext)(u),b=E.login;E.logout;return o.a.createElement("form",{className:"auth-form",onSubmit:function(e){if(e.preventDefault(),0!==n.trim().length&&0!==s.trim().length){var t={query:"\n                query Login($email: String!, $password: String!){\n                    login(email: $email, password: $password) {\n                        userId\n                        token\n                        tokenExpiration\n                    }\n                }\n            ",variables:{email:n,password:s}};p||(t={query:"\n                    mutation CreateUser($email: String!, $password: String!){\n                        createUser(userInput: {email: $email, password: $password}){\n                            _id\n                            email\n                        }\n                    }\n                ",variables:{email:n,password:s}}),fetch("http://localhost:8000/graphql",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){console.log(e),e.data.login.token&&b(e.data.login.token,e.data.login.userId,e.data.login.tokenExpiration)})).catch((function(e){console.log(e)}))}}},o.a.createElement("div",{className:"form-control"},o.a.createElement("label",{htmlFor:"email"},"E-Mail"),o.a.createElement("input",{type:"email",id:"email",onChange:function(e){return r(e.target.value)}})),o.a.createElement("div",{className:"form-control"},o.a.createElement("label",{htmlFor:"password"},"Password"),o.a.createElement("input",{type:"password",id:"password",onChange:function(e){return m(e.target.value)}})),o.a.createElement("div",{className:"form-actions"},o.a.createElement("button",{onClick:function(){return h(!p)},type:"button"},"Switch to ",p?"Signup":"Login"),o.a.createElement("button",{type:"submit"},"Submit")))},d=n(13),f=(n(29),n(30),function(e){return o.a.createElement("div",{className:"modal"},o.a.createElement("header",{className:"modal__header"},e.title),o.a.createElement("section",{className:"modal__content"},e.children),o.a.createElement("section",{className:"modal__actions"},e.canCancel&&o.a.createElement("button",{className:"btn",onClick:e.onCancel},"Cancel"),e.canConfirm&&o.a.createElement("button",{className:"btn",onClick:e.onConfirm},e.confirmText)))}),p=(n(31),function(e){return o.a.createElement("div",{className:"backdrop"})}),h=(n(32),n(33),function(e){return o.a.createElement("li",{key:e.eventId,className:"event__list-item"},o.a.createElement("div",null,o.a.createElement("h1",null,e.eventTitle),o.a.createElement("h2",null,"$",e.price," - ",new Date(e.date).toLocaleDateString())),o.a.createElement("div",null,e.userId===e.creatorId?o.a.createElement("p",null,"You create this event."):o.a.createElement("button",{onClick:e.onDetail.bind(void 0,e.eventId),className:"btn"},"View Details")))}),E=function(e){var t=e.events.map((function(t){return o.a.createElement(h,{key:t._id,eventId:t._id,eventTitle:t.title,userId:e.authUserId,creatorId:t.creator._id,price:t.price,date:t.date,onDetail:e.onViewDetail})}));return o.a.createElement("ul",{className:"event__list"},t)},b=(n(34),function(){return o.a.createElement("div",{className:"spinner"},o.a.createElement("div",{className:"lds-dual-ring"}))}),v=function(){var e=Object(a.useState)(!1),t=Object(c.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(""),i=Object(c.a)(l,2),s=i[0],m=i[1],h=Object(a.useState)(""),v=Object(c.a)(h,2),g=v[0],O=v[1],j=Object(a.useState)(""),k=Object(c.a)(j,2),C=k[0],S=k[1],y=Object(a.useState)(""),N=Object(c.a)(y,2),_=N[0],w=N[1],I=Object(a.useContext)(u),x=I.token,$=I.userId,T=Object(a.useState)(""),F=Object(c.a)(T,2),q=F[0],B=F[1],D=Object(a.useState)(!1),A=Object(c.a)(D,2),P=A[0],J=A[1],L=Object(a.useState)(null),z=Object(c.a)(L,2),U=z[0],H=z[1],V=!0;Object(a.useEffect)((function(){return G(),function(){V=!1}}),[]);var G=function(){J(!0);fetch("http://localhost:8000/graphql",{method:"POST",body:JSON.stringify({query:"\n                query {\n                    events{\n                        _id\n                        title\n                        description\n                        date\n                        price\n                        creator {\n                            _id\n                            email\n                        }\n                    }\n                }\n            "}),headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){V&&(console.log(e),B(e.data.events),J(!1))})).catch((function(e){console.log(e),V&&J(!1)}))},M=function(){r(!1),H(null)};return o.a.createElement(o.a.Fragment,null,(n||U)&&o.a.createElement(p,null),n&&o.a.createElement(f,{title:"Add Event",canCancel:!0,canConfirm:!0,onCancel:M,onConfirm:function(){if(r(!1),console.log(s,g,_,C),s&&g&&_&&C){var e={title:s,price:g,date:_,description:C};console.log(e);var t={query:"\n                mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!){\n                    createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}){\n                        _id\n                        title\n                        description\n                        date\n                        price\n                    }\n                }\n            ",variables:{title:s,description:C,price:g,date:_}};fetch("http://localhost:8000/graphql",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json",Authorization:"Bearer "+x},credentials:"include"}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){var t=Object(d.a)(q);t.push({_id:e.data.createEvent._id,title:e.data.createEvent.title,description:e.data.createEvent.description,price:e.data.createEvent.price,date:e.data.createEvent.date,creator:{_id:$}}),B(t)})).catch((function(e){console.log(e)}))}},confirmText:"Confrim"},o.a.createElement("form",null,o.a.createElement("div",{className:"form-control"},o.a.createElement("label",{htmlFor:"title"},"Title"),o.a.createElement("input",{type:"text",id:"title",onChange:function(e){return m(e.target.value)}})),o.a.createElement("div",{className:"form-control"},o.a.createElement("label",{htmlFor:"price"},"Price"),o.a.createElement("input",{type:"number",id:"price",onChange:function(e){return O(+e.target.value)}})),o.a.createElement("div",{className:"form-control"},o.a.createElement("label",{htmlFor:"date"},"Date"),o.a.createElement("input",{type:"datetime-local",id:"date",onChange:function(e){return w(e.target.value)}})),o.a.createElement("div",{className:"form-control"},o.a.createElement("label",{htmlFor:"description"},"Description"),o.a.createElement("textarea",{id:"description",rows:"4",onChange:function(e){return S(e.target.value)}})))),U&&o.a.createElement(f,{title:U.title,canCancel:!0,canConfirm:!0,onCancel:M,onConfirm:function(){if(x){var e={query:"\n                mutation BookEvent($eventId: ID!){\n                    bookEvent(eventId: $eventId){\n                        _id\n                        createdAt\n                        updatedAt\n                        user{\n                            email\n                        }\n                    }\n                }\n            ",variables:{eventId:U._id}};fetch("http://localhost:8000/graphql",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer "+x},credentials:"include"}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){console.log(e),H(null)})).catch((function(e){console.log(e)}))}else H(null)},confirmText:x?"Book":"Confirm"},o.a.createElement("h1",null,U.title),o.a.createElement("h2",null,"$",U.price," - ",new Date(U.date).toLocaleDateString()),o.a.createElement("p",null,U.description)),x&&o.a.createElement("div",{className:"events-control"},o.a.createElement("p",null,"Create your own Events"),o.a.createElement("button",{className:"btn",onClick:function(){return r(!0)}},"Create Event")),q&&!P?o.a.createElement(E,{authUserId:$,events:q,onViewDetail:function(e){var t=q.find((function(t){return t._id===e}));H(t)}}):o.a.createElement(b,null))},g=(n(35),function(e){var t=Object(a.useContext)(u),n=t.token,r=(t.userId,Object(a.useState)(!1)),l=Object(c.a)(r,2),i=(l[0],l[1]),s=function(t){i(!0);var a={query:"\n                mutation CancelBooking($id: ID!) {\n                    cancelBooking(bookingId: $id){\n                        _id\n                        title\n                    }\n                }\n            ",variables:{id:t}};fetch("http://localhost:8000/graphql",{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json",Authorization:"Bearer "+n},credentials:"include"}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(n){var a=e.bookings.filter((function(e){return e._id!==t}));e.setBookings(a),i(!1)})).catch((function(e){console.log(e),i(!1)}))};return o.a.createElement("ul",{className:"bookings__list"},e.bookings&&e.bookings.map((function(e){return o.a.createElement("li",{key:e._id,className:"bookings__item"},o.a.createElement("div",{className:"bookings__item-data"},e.event.title," - "," ",new Date(e.createdAt).toLocaleDateString()),o.a.createElement("div",{className:"bookings__item-actions"},o.a.createElement("button",{onClick:s.bind(void 0,e._id),className:"btn"},"Cancel")))})))}),O=n(36).Bar,j={Cheap:{max:100,min:0},Normal:{max:200,min:100},Expensive:{max:1e6,min:200}},k=function(e){var t=[],n={labels:[],datasets:[]},a=function(a){var o=e.bookings.reduce((function(e,t){return console.log(t.event.price,j[a]),t.event.price>j[a].min&&t.event.price<j[a].max?e+1:e}),0);t.push(o),n.labels.push(a),n.datasets.push({backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:1,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",data:t}),(t=Object(d.a)(t))[t.length-1]=0};for(var r in j)a(r);return o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(O,{data:n}))},C=(n(49),function(e){return o.a.createElement("div",{className:"bookings-control"},o.a.createElement("button",{className:"list"===e.actioveOutput?"active":"",onClick:e.changeOutputHandler.bind(void 0,"list")},"List"),o.a.createElement("button",{className:"chart"===e.actioveOutput?"active":"",onClick:e.changeOutputHandler.bind(void 0,"chart")},"Chart"))}),S=function(){var e=Object(a.useState)(!1),t=Object(c.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(""),i=Object(c.a)(l,2),s=i[0],m=i[1],d=Object(a.useState)("list"),f=Object(c.a)(d,2),p=f[0],h=f[1],E=Object(a.useContext)(u),v=E.token;E.userId;Object(a.useEffect)((function(){j(),O()}),[]);var O=function(){fetch("https://api.github.com/users/vasivanov/repos",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){e.map((function(e){console.log(e.name),console.log(e.html_url)}))})).catch((function(e){console.log(e)}))},j=function(){r(!0);fetch("http://localhost:8000/graphql",{method:"POST",body:JSON.stringify({query:"\n                query {\n                    bookings {\n                        _id\n                        createdAt\n                        event {\n                            _id\n                            title\n                            date\n                            price\n                        }\n                    }\n                }\n            "}),headers:{"Content-Type":"application/json",Authorization:"Bearer "+v},credentials:"include"}).then((function(e){if(console.log(e),200!==e.status&&201!==e.status)throw new Error("Failed");return e.json()})).then((function(e){m(e.data.bookings),console.log(e),r(!1)})).catch((function(e){console.log(e),r(!1)}))},S=o.a.createElement(b,null);return n||(S=o.a.createElement(o.a.Fragment,null,o.a.createElement(C,{changeOutputHandler:function(e){h("list"===e?"list":"chart")},actioveOutput:p}),o.a.createElement("div",null,"list"===p?o.a.createElement(g,{setBookings:m,bookings:s}):o.a.createElement(k,{bookings:s})))),o.a.createElement(o.a.Fragment,null,S)},y=(n(50),function(){var e=Object(a.useContext)(u),t=e.token,n=(e.userId,e.logout);return o.a.createElement("header",{className:"main-navigation"},o.a.createElement("div",{className:"main-navigation__logo"},o.a.createElement("h1",null,"Event Booker")),o.a.createElement("nav",{className:"main-navigation__items"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(i.b,{to:"/events"},"Events")),t&&o.a.createElement("li",null,o.a.createElement(i.b,{to:"/bookings"},"Bookings")),!t&&o.a.createElement("li",null,o.a.createElement(i.b,{to:"/auth"},"Authentication")),t&&o.a.createElement("li",null,o.a.createElement("button",{onClick:n},"Logout")))))});var N=function(){var e=Object(a.useState)(localStorage.getItem("token")||null),t=Object(c.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(null),d=Object(c.a)(l,2),f=d[0],p=d[1];return window.onbeforeunload=function(){n&&localStorage.setItem("token",n)},o.a.createElement("div",{className:"App"},o.a.createElement(i.a,null,o.a.createElement(u.Provider,{value:{token:n,userId:f,logout:function(){localStorage.removeItem("token"),r(null),p(null)},login:function(e,t,n){r(e),p(t)}}},o.a.createElement(y,null),o.a.createElement("main",{className:"main-content"},o.a.createElement(s.d,null,n&&o.a.createElement(s.a,{from:"/",to:"/events",exact:!0}),n&&o.a.createElement(s.a,{from:"/auth",to:"/events",exact:!0}),!n&&o.a.createElement(s.b,{path:"/auth",component:m}),o.a.createElement(s.b,{path:"/events",component:v}),n&&o.a.createElement(s.b,{path:"/bookings",component:S}),!n&&o.a.createElement(s.a,{to:"/auth",exact:!0}))))))};l.a.render(o.a.createElement(N,null),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.7de013d9.chunk.js.map