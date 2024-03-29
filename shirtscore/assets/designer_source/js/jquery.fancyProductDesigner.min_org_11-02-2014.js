(function (h) {
    var n = function (d, n) {
        var f = h.extend({}, h.fn.fancyProductDesigner.defaults, n),
            l = this,
            b, e, m, t, y, I = null,
            c, ha, a, g, X, ca, p, J, Q, R, T, U, S, D = 0,
            C = -1,
            A = null,
            Y = 0,
            s = null,
            q = null,
            F = 0,
            V = null,
            O = !1,
            Z = !1,
            N = !1,
            w = !1,
            z = "Helvetica";
        window.localStorage.length;
        b = h(d).addClass("fpd-container fpd-clearfix");
        J = b.children(".fpd-product").remove();
        Q = b.children(".fpd-design, .fpd-motive").children("img, span");
        ca = document.createElement("canvas");
        if (!Boolean(ca.getContext && ca.getContext("2d"))) return b.append('<div class="fpd-browser-alert"><p>' + f.labels.canvasAlert + "</p></div>").children("div").append('<span><a href="http://www.mozilla.org/firefox/new/" title="Download Firefox" class="firefox"></a><a href="http://www.google.com/Chrome" title="Download Chrome" class="chrome"></a><a href="http://www.opera.com/download/" title="Download Opera" class="opera"></a></span>'), b.trigger("canvasFail"), !1;
        e = b.append('<div class="fpd-product-selection"><a href="#" class="fpd-scroll-up ui-state-default"><span class="ui-icon ui-icon-carat-1-n"></span></a><div><ul></ul></div><a href="#" class="fpd-scroll-down ui-state-default"><span class="ui-icon ui-icon-carat-1-s"></span></a></div>').children(".fpd-product-selection").find("ul");
        m = b.append('<div class="fpd-product-container"><div><div class="fpd-toolbar"></div><div class="fpd-products"></div><div class="fpd-saved-products"><ul></ul></div></div><section class="fpd-clearfix"></section></div>').children(".fpd-product-container").children("div");
        c = m.children(".fpd-toolbar").append('<div class="fpd-color-picker fpd-clearfix"><input type="text" value="" disabled="disabled" /></div><select class="fpd-fonts-dropdown"></select><input type="text" value="" class="fpd-text-input" /><div class="fpd-z-switcher ui-state-default" title="' + f.labels.zPositionSwitcher + '"><span class="ui-icon ui-icon-carat-2-n-s"></span></div><div class="fpd-reset ui-state-default" title="' + f.labels.resetButton + '"><span class="ui-icon ui-icon-refresh"></span></div><div class="fpd-deselect ui-state-default" title="' + f.labels.deselectButton + '"><span class="ui-icon ui-icon-closethick"></span></div>');
        ca = m.parent().children("section");
        y = m.children(".fpd-saved-products");
        ha = c.children(".fpd-color-picker");
        g = c.children(".fpd-z-switcher");
        X = c.children(".fpd-text-input");
        t = m.children(".fpd-products");
        this.addProduct = function (j) {
            e.append('<li><img src="' + j[0].thumbnail + '" title="' + j[0].title + '" /></li>');
            e.children("li:last").click(function () {
                var j = h(this),
                    b = e.find("li").index(j);
                if (b == C) return !1;
                C = b;
                sa(j.data("views"));
                return !1
            }).data("views", j);
            1 < e.children("li").size() && b.children(".fpd-product-selection").show()
        };
        this.getProduct = function (j) {
            onlyEditableElemets = "undefined" !== typeof j ? j : !1;
            if (w) return alert(f.labels.outOfContainmentAlert), !1;
            $();
            var u = [];
            t.children("div").each(function (b, c) {
                var a = h(c),
                    r = {
                        title: h(c).attr("title"),
                        thumbnail: h(c).data("thumbnail"),
                        elements: []
                    };
                a.children(j ? ".fpd-editable" : ".fpd-element").each(function (j, u) {
                    var b = {}, c = h(u);
                    b.title = c.attr("title");
                    b.source = c.data("source");
                    b.parameters = c.data("params");
                    b.type = void 0 == b.parameters.text ? "image" : "text";
                    r.elements[j] = b
                });
                r.elements.sort(function (j, u) {
                    return Number(j.parameters.z) - Number(u.parameters.z)
                });
                u.push(r)
            });
            return u
        };
        this.addElement = function (j, u, c, a, r) {
            r = "undefined" !== typeof r ? r : Y;
            $();
            E();
            if ("object" != typeof a) return alert("The element " + c + " has not a valid JSON object as parameters!"), !1;
            a = h.extend({}, f.elementParameters, a);
            a.source = u;
            a.originX = a.x;
            a.originY = a.y;
            r = t.children("div").eq(r);
                
            var n = u.search("/assets/uploads/products/");
                if (jQuery('#product_face').val() == 0)
                    var face = 'f_';
                else
                    var face = 'b_';
                if (n == -1){
                    var left_c =  300;
                    var top_c =  310;
                    // console.log(u);
                    // if (u == 'Enter your text here'){
                    //   document.getElementById("last_added").setAttribute("value","text");
                    // }else{
                    //   var left_c =  parseInt(jQuery('#f_left').val()) + 1;
                    //   var top_c =  parseInt(jQuery('#f_top').val()) + 1;
                    //   document.getElementById("last_added").setAttribute("value","img");
                    // };
                    var d = r.append('<div class="fpd-element"></div>').children("div:last").css({
                        left: left_c,
                        top: top_c,
                        "z-index": r.children("div").size() - 1
                    }).attr("title", c).data("source", u).attr("id", face + (r.children(".fpd-element").size() - 1));

                }
                else{
                    var d = r.append('<div class="fpd-element"></div>').children("div:last").css({
                        left: a.x,
                        top: a.y,
                        "z-index": r.children("div").size() - 1
                    }).attr("title", c).data("source", u).attr("id", face + (r.children(".fpd-element").size() - 1));
                }

            a.z = r.children(".fpd-element").size() - 1;
            da(d, a.degree);
            if (a.colors && "string" == typeof a.colors)
                if (0 == a.colors.indexOf("#")) c = a.colors.replace(/\s+/g, "").split(","), a.colors = c, a.currentColor = c[0];
                else {
                    c = s[0];
                    for (r = 0; r < c.elements.length; r++) c.elements[r].title == a.colors && (a.currentColor = c.elements[r].parameters.currentColor ? c.elements[r].parameters.currentColor : c.elements[r].parameters.colors)
                }
            if ("image" == j) {
                var e = new Image;
                e.src = u;
                // var n = u.search("/assets/uploads/products/");
                // if (n == -1){
                //     a.width = parseInt(jQuery('#f_width').val()) - 1;
                //     if (e.height > parseInt(jQuery('#f_height').val()))
                //         a.height = parseInt(jQuery('#f_height').val()) - 1;
                //     else
                //         a.height = e.height;
                // }
                e.onload = function () {
                    var j = a.width ? a.width : e.width * a.scale,
                        u = a.height ? a.height : e.height * a.scale,
                        c = 1;
                    j > u ? j < f.minImageWidth ? c = f.minImageWidth / j : j > f.maxImageWidth && (c = f.maxImageWidth / j) : u < f.minImageHeight ? c = f.minImageHeight / u : u > f.maxImageHeight && (c = f.maxImageHeight / u);
                    j *= c;
                    u *= c;
                    if (0 < a.colors.length) {
                        var c = a.currentColor,
                            r = document.createElement("canvas"),
                            g = r.getContext("2d");
                        r.width = this.width;
                        r.height = this.height;
                        g.drawImage(this, 0, 0);
                        d.append(r);
                        fa(g, c)
                    } else d.append(e);
                    d.children("canvas, img").width(j).height(u).parent().css({
                        width: j,
                        height: u
                    });
                    0 < a.colors.length || a.removable || a.draggable || a.resizable || a.rotatable ? K(d) : d.css("pointer-events", "none");
                    a.originWidth = j;
                    a.originHeight = u;
                    a.width = j;
                    a.height = u;
                    d.data("params", a);
                    b.trigger("elementAdded", [d])
                }
            } else "text" == j ? (a.text = a.text ? a.text : a.source, a.font = a.font ? a.font : z, a.textSize = a.textSize ? a.textSize : f.textSize * a.scale, j = h("<p>" + a.text + "</p>"), d.append(j).children("p:first").css({
                fontSize: a.textSize,
                fontFamily: a.font,
                paddingTop: 8,
                paddingRight: 5,
                paddingBottom: 8,
                paddingLeft: 5
            }), 0 < a.colors.length && j.css("color", a.currentColor), K(d), d.data("params", a), b.trigger("elementAdded", [d])) : alert("Sorry. This type of element is not allowed!");
            a.price && (F += a.price, b.trigger("priceChange", [a.price, F]))
            // console.log(a);
        };
        this.addDesign = function (j, u, a) {
            null == I && (I = b.append('<div class="fpd-design-selection"><a href="#" class="fpd-scroll-up ui-state-default"><span class="ui-icon ui-icon-carat-1-n"></span></a><div><ul class="fpd-clearfix"></ul></div><a href="#" class="fpd-scroll-down ui-state-default"><span class="ui-icon ui-icon-carat-1-s"></span></a></div>').children(".fpd-design-selection").find("ul"));
            I.append("<li></li>").children("li:last").append('<img src="' + j + '" title="' + u + '" />').click(function () {
                var j = h(this);
                l.addElement("image", j.children("img").attr("src"), j.children("img").attr("title"), j.data("parameters"), Y)
            }).data("parameters", a)
        };
        this.getPrice = function () {
            return F
        };
        this.print = function () {
            $();
            m.css("overflow", "visible").parent().css("overflow", "visible");
            t.html2canvas({
                onrendered: function (j) {
                    m.css("overflow", "hidden").parent().css("overflow", "hidden");
                    var u = m.height() * s.length,
                        a = window.open("", "", "width=" + m.width() + ",height=" + u + ",location=no,menubar=no,scrollbars=yes,status=no,toolbar=no");
                    a.document.title = "Print Image";
                    h(a.document.body).append('<img src="' + j.toDataURL("image/png") + '" />');
                    setTimeout(function () {
                        a.print()
                    }, 1E3)
                }
            })
        };
        this.clear = function () {
            $();
            m.children(".fpd-views-selection").remove();
            t.empty();
            s = q = null;
            Y = F = 0;
            t.css("top", 0)
        };
        this.createImage = function (j, u) {
            "undefined" === typeof j && (j = !0);
            "undefined" === typeof u && (u = !1);
            $();
            m.css("overflow", "visible").parent().css("overflow", "visible");
            t.html2canvas({
                onrendered: function (a) {
                    m.css("overflow", "hidden").parent().css("overflow", "hidden");
                    var c = a.toDataURL("image/png");
                    if (j) {
                        var r = m.height() * s.length,
                            r = window.open("", "", "width=" + m.width() + ",height=" + r + ",location=no,menubar=no,scrollbars=yes,status=no,toolbar=no");
                        r.document.title = "Product Image";
                        h(r.document.body).append('<img src="' + c + '" />');
                        u && (window.location.href = r.document.getElementsByTagName("img")[0].src.replace("image/png", "image/octet-stream"))
                    }
                    b.trigger("imageCreate", [a, c])
                }
            });
            return !1
        };
        var sa = function (j) {
            E();
            l.clear();
            s = j;
            t.css({
                height: m.height() * j.length,
                top: 0
            });
            D = F = Y = 0;
            A = j[0].title;
            if (1 < j.length) var u = m.append('<ul class="fpd-views-selection fpd-clearfix"></ul>').children(".fpd-views-selection");
            for (var a = 0; a < j.length; ++a) {
                var c = j[a];
                t.append('<div class="fpd-single-product" style="top: ' + a * m.height() + 'px;" title="' + c.title + '" data-thumbnail="' + c.thumbnail + '"></div>');
                ba(c.title, c.elements);
                1 < j.length && u.append('<li><img onclick=\'changeImage("'+a+'");\' src="' + c.thumbnail + '" title="' + c.title + '" /></li>')
            }
            1 < j.length && u.children("li").click(function () {
                var j = h(this),
                    j = u.children("li").index(j);
                j != Y && ($(), Y = j, t.animate({
                    top: -(m.height() * j)
                }, 300), V = t.children("div").eq(j))
            });
            V = t.children("div:first")
        }, ba = function (j, a) {
                for (var c = 0; c < a.length; ++c) {
                    var b = a[c];
                    l.addElement(b.type, b.source, b.title, b.parameters, t.children("div").size() - 1)
                }
                f.allowProductSaving && (c = ja(), c = h.map(c, function (j, a) {
                    return a
                }).length, 0 < c ? p.show().children(".fpd-product-counter").text(c) : p.hide())
            }, K = function (j) {
                j.addClass("fpd-editable").children("img, canvas, p").css("cursor", "pointer").click(function () {
                    $();
                    E();
                    var u = j.data("params");
                    c.show();
                    // console.log(j[0]);
                    // console.log(c);
                    0 < j.children("p").size() && (a.show(), a.children('option[value="' + u.font + '"]').prop("selected", "selected"), X.show().val(j.children("p").text()));
                    q = j.addClass("selected");
                    u.removable && q.append('<button title="' + f.labels.removeElementButton + '" class="fpd-remove ui-state-default ui-corner-all"><span class="ui-icon ui-icon-trash"></span></button>').children(".fpd-remove ").hammer().bind("tap", function () {
                        0 != q.data("params").price && (F -= q.data("params").price, b.trigger("priceChange", [q.data("params").price, F]));
                        // console.log(h(this).parent().attr('id'));
                        //joe//
                        // alert(h(this).parent().attr('id')+' ## '+ h(this).parent().attr('title'));
                        var rm_id=h(this).parent().attr('id');
                        var rm_title=h(this).parent().attr('title');
                        // alert(rm_id.replace(/\d+/g, ''));
                         var rm_id_arr = rm_id.split("_");

                         if(rm_id_arr[0]=="f" && rm_title=="my custom design"){
                           // alert('yes f_custom_img');
                            jQuery('input[name="f_custom_img"]').val('');
                         }

                         if(rm_id_arr[0]=="b" && rm_title=="my custom design"){
                             // alert('yes b_custom_img');
                            jQuery('input[name="b_custom_img"]').val('');
                         }

                        document.getElementById("editable_element_"+h(this).parent().attr('id')).remove();
                        h(this).parent().remove();
                        $();
                        return !1
                    });
                    u.draggable && (tempy = null, q.append('<button title="' + f.labels.dragElementButton + '" class="fpd-drag ui-state-default ui-corner-all"><span class="ui-icon ui-icon-arrow-4"></span></button>').hammer({
                        drag_min_distance: 1
                    }).bind("dragstart", function (j) {
                        j.preventDefault();
                        j.gesture.preventDefault();
                        T = parseFloat(q.css("left"));
                        U = parseFloat(q.css("top"));
                        S = parseFloat(q.css("width"));
                        O = !0
                    }));
                    u.resizable && q.append('<button title="' + f.labels.resizeElementButton + '" class="fpd-resize ui-state-default ui-corner-all"><span class="ui-icon ui-icon-arrowthick-2-se-nw"></span></button>').children(".fpd-resize").hammer({
                        drag_min_distance: 1
                    }).bind("dragstart", function (j) {
                        j.preventDefault();
                        j.gesture.preventDefault();
                        Z = !0
                    });
                    u.rotatable && q.append('<button title="' + f.labels.rotateElementButton + '" class="fpd-rotate ui-state-default ui-corner-all"><span class="ui-icon ui-icon-arrowrefresh-1-e"></span></button>').children(".fpd-rotate").hammer({
                        drag_min_distance: 1
                    }).bind("dragstart", function (j) {
                        j.preventDefault();
                        j.gesture.preventDefault();
                        N = !0
                    });
                    Array.isArray(u.colors) ? (ha.children("input").val(u.currentColor), 1 < u.colors.length ? ha.children("input").spectrum("destroy").spectrum({
                        preferredFormat: "hex",
                        showPaletteOnly: !0,
                        palette: u.colors,
                        change: function (j) {
                            ia(q, j.toHexString())
                        }
                    }) : ha.children("input").spectrum("destroy").spectrum({
                        preferredFormat: "hex",
                        showInput: !0,
                        chooseText: "Change Color",
                        change: function (j) {
                            ia(q, j.toHexString())
                        }
                    }), ha.show()) : ha.hide();
                    u.zChangeable && g.show();
                    if ("string" == typeof u.boundingBox) {
                        var r = V.children('div[title="' + u.boundingBox + '"]');
                        0 < r.size() && (u.boundingBox = {
                            x: r.position().left,
                            y: r.position().top,
                            width: r.width(),
                            height: r.height()
                        })
                    }
                    "object" == typeof u.boundingBox && (u = u.boundingBox, V.append('<div class="containment"></div>').children(".containment").css({
                        left: parseInt(jQuery('#f_left').val()),
                        top: parseInt(jQuery('#f_top').val()),
                        width: parseInt(jQuery('#f_width').val()),
                        height: parseInt(jQuery('#f_height').val()),
                        "z-index": V.children("div").size() - 1
                    }));
                    f.editorMode && ea()
                })
            }, ia = function (j, a) {
                4 == a.length && (a += a.substr(1, a.length));
                if (0 < j.children("p").size()) j.children("p").css("color", a);
                else {
                    var c = j.children("canvas").get(0);
                    fa(c.getContext("2d"), a)
                }
                j.data("params").currentColor = a;
                ha.children("input").spectrum("set", a);
                var b = j.attr("title"),
                    r = a;
                0 == Y && t.children("div").each(function (j, a) {
                    0 < j && h(a).children("div").each(function (j, a) {
                        b == h(a).data("params").colors && h(a).data("params").currentColor != r && ia(h(a), r)
                    })
                })
            }, fa = function (j, a) {
                for (var c = j.getImageData(0, 0, j.canvas.width, j.canvas.height), r = c.data, b = 0; b < r.length; b += 4) r[b] = parseInt(W(a).substring(0, 2), 16), r[b + 1] = parseInt(W(a).substring(2, 4), 16), r[b + 2] = parseInt(W(a).substring(4, 6), 16);
                j.putImageData(c, 0, 0)
            }, $ = function () {
                V && (V.children("div").removeClass("selected").children("button").remove(), V.children("div.containment").remove());
                ha.hide();
                g.hide();
                c.hide();
                a.hide();
                X.val("").hide();
                q = null;
                f.editorMode && R.find("p > span:nth-child(2n)").text("")
            }, L = function (j, a, c, b) {
                var r = q.data("params").boundingBox,
                    d = !1;
                
                r.x = parseInt(jQuery('#f_left').val());
                r.y = parseInt(jQuery('#f_top').val());
                r.width = parseInt(jQuery('#f_width').val());
                r.height = parseInt(jQuery('#f_height').val());

                j < r.x && (d = !0);
                a < r.y && (d = !0);
                j + c > r.x + r.width && (d = !0);
                a + b > r.y + r.height && (d = !0);

                // console.log(r);

                return d
            }, ea = function () {
                if (q) {
                    var j = q.data("params");
                    // console.log(q);
                    R.children(".fpd-current-element").children("span:last").text(q.attr("title"));
                    R.children(".fpd-position").children("span:last").text("x: " + j.x + ", y: " + j.y);
                    R.children(".fpd-dimensions").children("span:last").text(j.width ? "Width: " + j.width + "px, Height: " + j.height + "px" : "Textsize: " + j.textSize + "px")
                }
            }, da = function (j, a) {
                j.css("-moz-transform", "rotate(" + a + "deg)");
                j.css("-webkit-transform", "rotate(" + a + "deg)");
                j.css("-o-transform", "rotate(" + a + "deg)");
                j.css("-ms-transform", "rotate(" + a + "deg)")
            }, ja = function () {
                for (var j = 0, a = 0, c = {}, r = Object.keys(window.localStorage), b; b = r[j];) {
                    var d = b.substr(0, b.indexOf("_"));
                    A == d && window.localStorage.getItem(b) && (c[b] = JSON.parse(window.localStorage.getItem(b)), a++);
                    j++
                }
                return c
            }, G = function (j) {
                var a = Number(p.children(".fpd-product-counter").text());
                j = "+" == j ? a + 1 : a - 1;
                0 >= j ? (p.hide().children(".fpd-product-counter").text(""), E()) : p.show().children(".fpd-product-counter").text(String(j))
            }, E = function () {
                y.hasClass("fpd-showing") && y.removeClass("fpd-showing").animate({
                    left: -(y.outerWidth() + 10)
                }, 300)
            }, W = function (j) {
                return "#" == j.charAt(0) ? j.substring(1, 7) : j
            };
        b.children("div:last").css("marginRight", 0).trigger("ready");
        for (var H = [], r = 0; r < J.length; ++r) {
            H = h(J.get(r)).children(".fpd-product");
            H.splice(0, 0, J.get(r));
            var Ja = [];
            H.each(function (j, a) {
                var c = h(a),
                    b = {
                        title: a.title,
                        thumbnail: c.data("thumbnail"),
                        elements: []
                    };
                c.children("img,span").each(function (j, a) {
                    var c = h(a),
                        c = {
                            type: c.is("img") ? "image" : "text",
                            source: c.is("img") ? c.attr("src") : c.text(),
                            title: c.attr("title"),
                            parameters: void 0 == c.data("parameters") ? {} : c.data("parameters")
                        };
                    b.elements.push(c)
                });
                Ja.push(b)
            });
            l.addProduct(Ja)
        }
        if (0 < Q.size()) {
            Q.parent().remove();
            for (r = 0; r < Q.length; ++r) l.addDesign(Q[r].src, Q[r].title, h(Q[r]).data("parameters"))
        }
        a = c.children(".fpd-fonts-dropdown").change(function () {
            q.data("params").font = this.value;
            q.children("p").css("font-family", this.value)
        });
        g.click(function () {
            var j = parseInt(q.css("z-index"));
            q.css("z-index", ++j);
            V.children("div").size() == j && q.css("z-index", -1);
            q.data("params").z = parseInt(q.css("z-index"))
        });
        f.customTexts && ca.append('<button title="' + f.labels.customTextButton + '" class="fpd-add-custom-text ui-state-default ui-corner-all"><span class="ui-icon ui-icon-pencil"></span><span>' + f.customTexts + "</span></button>").children(".fpd-add-custom-text").click(function () {
            l.addElement("text", f.defaultCustomText, f.defaultCustomText, f.customTextParamters, Y);
            return !1
        });
        f.allowProductSaving && (ca.append('<button title="' + f.labels.saveProductButton + '" class="fpd-save-product fpd-clearfix ui-state-default ui-corner-all"><span class="ui-icon ui-icon-disk"></span><span>' + f.labels.saveProductButton + '</span></button><button title="' + f.labels.savedProductsButton + '" class="fpd-saved-products ui-state-default ui-corner-all" style="display: none;"><span class="ui-icon ui-icon-note"></span><span>' + f.labels.savedProductsButton + '</span><span class="fpd-product-counter"></span></button>').children(".fpd-save-product").click(function () {
            $();
            E();
            var j = prompt(f.labels.saveProductInput, ""),
                a;
            if (null == j) a = -1;
            else if ("" == j) a = 0;
            else {
                a = 1;
                var c = Object.keys(ja());
                for (k in c)
                    if (c[k] == A + "_" + j) {
                        a = 2;
                        break
                    }
            } if (-1 == a) return !1;
            if (0 == a) return alert(f.labels.keyNotValidAlert), !1;
            if (2 == a) {
                var b = confirm(f.labels.keyInUseAlert);
                if (!b) return !1
            }
            a = l.getProduct(!1);
            a = JSON.stringify(a);
            window.localStorage.setItem(A + "_" + j, a);
            p.is(":hidden") ? p.show().children(".fpd-product-counter").text("1") : b || G("+");
            return !1
        }), p = ca.children(".fpd-saved-products").click(function () {
            $();
            if (y.is(":animated")) return !1;
            if (y.hasClass("fpd-showing")) E();
            else {
                y.children("ul").empty();
                var a = ja(),
                    c = Object.keys(ja()).sort();
                for (r in c) {
                    var b = c[r],
                        d = a[b];
                    y.children("ul").append('<li class="fpd-clearfix"><a href="#"><span class="ui-icon ui-icon-circle-close"></span></a><span title="' + d.title + '">' + b.substr(b.indexOf("_") + 1) + "</span></li>").children("li:last").children("span").click(function () {
                        sa(h(this).data("elements"))
                    }).data("elements", d).parent().children("a").click(function () {
                        if (!confirm(f.labels.confirmProductDelete)) return !1;
                        window.localStorage.removeItem(h(this).data("key"));
                        h(this).parent().remove();
                        G("-");
                        return !1
                    }).data("key", b)
                }
                y.addClass("fpd-showing").animate({
                    left: 0
                }, 300)
            }
            return !1
        }));
//<button title="' + f.labels.previousElementButton + '" class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-1-w"></span></button><button title="' + f.labels.nextElementButton + '" class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-1-e"></span></button>
        ca.append('<div class="fpd-element-switcher fpd-clearfix"></div>').find(".fpd-element-switcher > button:first").click(function () {
            q ? 0 == q.prevAll(".fpd-editable:first").size() ? V.children(".fpd-editable:last").children("img, canvas, p").click() : q.prevAll(".fpd-editable:first").children("img, canvas, p").click() : V.children(".fpd-editable:first").children("img, canvas, p").click();
            return !1
        }).parent().children("button:last").click(function () {
            q ? 0 == q.nextAll(".fpd-editable:first").size() ? V.children(".fpd-editable:first").children("img, canvas, p").click() : q.nextAll(".fpd-editable:first").children("img, canvas, p").click() : V.children(".fpd-editable:first").children("img, canvas, p").click();
            return !1
        });
        if (0 < f.fonts.length && f.fontDropdown) {
            z = f.fonts[0];
            f.fonts.sort();
            for (r = 0; r < f.fonts.length; ++r) a.append('<option value="' + f.fonts[r] + '" style="font-family: ' + f.fonts[r] + ';">' + f.fonts[r] + "</option>");
            a.children('option[value="' + z + '"]').prop("selected", "selected");
            a.show()
        }
        X.keyup(function () {
            q.children("p").text(this.value);
            q.data("params").text = this.value
        });
        b.find(".fpd-scroll-up").click(function () {
            var a = h(this).next("div").children("ul"),
                c = 0 < parseInt(a.css("top")) + f.scrollAmount ? Math.abs(parseInt(a.css("top"))) : f.scrollAmount;
            0 > parseInt(a.css("top")) && a.is(":not(:animated)") && a.animate({
                top: "+=" + c
            }, 200);
            return !1
        });
        b.find(".fpd-scroll-down").click(function () {
            var a = h(this).parent().children("div"),
                c = a.children("ul"),
                b = Math.abs(parseInt(c.css("top"))) + a.height() + f.scrollAmount < c.height() ? -f.scrollAmount : Math.abs(parseInt(c.css("top"))) + a.height() - c.height();
            
            if(c.height() == "0"){
                if( Math.abs(parseInt(c.css("top"))) >= parseInt( a.height() - 100 ) )
                    return !1
                c.animate({
                    top: "+=" + parseInt("-100")
                });
                return !1
            }

            Math.abs(parseInt(c.css("top"))) + a.height() < c.height() && c.is(":not(:animated)") && c.animate({
                top: "+=" + b
            }, 200);
            return !1
        });
        c.children(".fpd-reset").click(function () {
            if (q) {
                var a = q.data("params");
                q.css({
                    left: a.originX,
                    top: a.originY,
                    width: a.originWidth,
                    height: a.originHeight
                });
                q.children("img, canvas").width(a.originWidth).height(a.originHeight);
                q.children("p").css({
                    fontSize: f.textSize * a.scale,
                    fontFamily: z
                }).text(a.source);
                da(q, 0);
                a.colors && (ia(q, a.colors[0]), a.currentColor = a.colors[0]);
                a.x = a.originX;
                a.y = a.originY;
                a.width = a.originWidth;
                a.height = a.originHeight;
                a.degree = 0;
                q.data("params", a);
                a.boundingBox && (L(a.x, a.y, a.width, a.height) ? (b.trigger("elementOut"), w = !0) : (b.trigger("elementIn"), w = !1))
            }
        });
        c.children(".fpd-deselect").click(function () {
            $()
        });
        b.bind("elementAdded", function () {
            ++D == h(J.get(C)).find("img, span").size() && b.trigger("productCreate")
        });
        b.bind("elementOut", function () {
            id = jQuery(q).attr('id');
            jQuery('#editable_element_'+id).val(0);
            q.append('<div class="fpd-warning"></div>').children("img, canvas, p").css("opacity", 0.5)
        });
        b.bind("elementIn", function () {
            // console.log(jQuery(q).attr('id'));
            id = jQuery(q).attr('id');
            jQuery('#editable_element_'+id).val(1);
            q.children("img, canvas, p").css("opacity", 1);
            q.children(".fpd-warning").remove()
        });
        t.hammer({
            drag_min_distance: 1,
            hold_timeout: 100
        }).bind("drag", function (a) {
            if (null != q) {
                a.preventDefault();
                a.gesture.preventDefault();
                var c = q.offset();
                q.position();
                var r = c.left + q.width() / 2,
                    d = c.top + q.height() / 2,
                    e = a.gesture,
                    g = e.touches[0].pageX,
                    y = e.touches[0].pageY;
                a = q.data("params");
                if (N) c = -1 * Math.atan2(g - r, y - d) * (180 / Math.PI) - 130, q.css("-moz-transform", "rotate(" + c + "deg)"), q.css("-webkit-transform", "rotate(" + c + "deg)"), q.css("-o-transform", "rotate(" + c + "deg)"), q.css("-ms-transform", "rotate(" + c + "deg)"), a.degree = c;
                else if (Z)
                    if (0 < q.children("img, canvas").size()) {
                        c = S + e.deltaX < f.minImageWidth ? f.minImageWidth : S + e.deltaX;
                        c > f.maxImageWidth && (c = f.maxImageWidth);
                        r = Math.round(a.originHeight * (c / a.originWidth));
                        if (r > f.maxImageHeight || r < f.minImageHeight) return !1;
                        q.width(c).height(r).children("img, canvas").css({
                            width: c,
                            height: r
                        });
                        a.width = c;
                        a.height = r
                    } else c = y - c.top - 20 < f.minTextSize ? f.minTextSize : y - c.top - 20, c > f.maxTestSize && (c = f.maxTestSize), q.children("p").css({
                        "font-size": c
                    }).keyup(), q.data("params").textSize = c;
                    else O && (q.css({
                        left: T + e.deltaX,
                        top: U + e.deltaY
                    }), q.data("params").x = parseFloat(q.css("left")), q.data("params").y = parseFloat(q.css("top")));
                if (a.boundingBox && (N || O || Z)) a = q.get(0).getBoundingClientRect().left - V.get(0).getBoundingClientRect().left - 1, d = q.get(0).getBoundingClientRect().top - V.get(0).getBoundingClientRect().top - 1, c = q.get(0).getBoundingClientRect().width - 3, r = q.get(0).getBoundingClientRect().height - 2, 0 < q.children("p").size() && (a += 5, d += 8, c -= 10, r -= 16), w != L(a, d, c, r) && (L(a, d, c, r) ? (b.trigger("elementOut", [q]), w = !0) : (b.trigger("elementIn", [q]), w = !1));
                f.editorMode && (N || O || Z) && ea()

                // console.log("left - "+a);
                // console.log("top - "+d);
                // console.log("width - "+c);
                // console.log("height - "+r);
            }
        }).bind("release", function () {
            N = Z = O = !1
        });
        f.editorMode && (R = b.append('<div class="fpd-editor-box"><h3>Editor Box</h3><p class="fpd-current-element"><span>Element: </span><span></span></p><p class="fpd-position"><span>Position: </span><span></span></p><p class="fpd-dimensions"><span>Dimensions: </span><span></span></p></div>').children(".fpd-editor-box"));
        e.children("li:first").click()
    };
    jQuery.fn.fancyProductDesigner = function (d) {
        return this.each(function () {
            var x = h(this);
            if (!x.data("fancy-product-designer")) {
                var f = new n(this, d);
                x.data("fancy-product-designer", f)
            }
        })
    };
    h.fn.fancyProductDesigner.defaults = {
        minImageWidth: 10,
        minImageHeight: 10,
        maxImageWidth: 700,
        maxImageHeight: 700,
        minTextSize: 10,
        maxTestSize: 50,
        textSize: 12,
        scrollAmount: 100,
        fontDropdown: !0,
        fonts: ["Arial", "Helvetica", "Times New Roman", "Verdana", "Geneva"],
        customTexts: "Add text",
        defaultCustomText: "Enter your text here",
        customTextParamters: {},
        editorMode: !1,
        elementParameters: {
            x: 0,
            y: 0,
            z: 0,
            colors: !1,
            removable: !1,
            draggable: !1,
            rotatable: !1,
            resizable: !1,
            zChangeable: !1,
            scale: 1,
            degree: 0,
            price: 0,
            boundingBox: !1
        },
        labels: {
            canvasAlert: "Sorry! But your browser does not support HTML5 Canvas. Please update your browser!",
            outOfContainmentAlert: "An element is out of his containment. Please move it in his containment!",
            zPositionSwitcher: "Change Z-Position",
            resetButton: "Reset",
            deselectButton: "Deselect",
            removeElementButton: "Remove element",
            dragElementButton: "Drag element",
            resizeElementButton: "Resize Element",
            rotateElementButton: "Rotate Element",
            customTextButton: "Add custom text",
            previousElementButton: "Select previous editable element",
            nextElementButton: "Select next editable element",
            saveProductButton: "Save",
            savedProductsButton: "Saved products",
            saveProductInput: "Enter a key for your product:",
            keyNotValidAlert: "The key is not valid!",
            keyInUseAlert: "The key is already used. Would you like to use it anyway?",
            confirmProductDelete: "Delete saved product?"
        },
        allowProductSaving: !0
    }
})(jQuery);
(function (h, n, d) {
    function x(b) {
        l.logging && (h.console && h.console.log) && h.console.log(b)
    }

    function f(b, d, c, e, a, g) {
        d = l.Util.getCSS(d, b, a);
        var m;
        1 === d.length && (a = d[0], d = [], d[0] = a, d[1] = a); - 1 !== d[0].toString().indexOf("%") ? (m = parseFloat(d[0]) / 100, a = c.width * m, "backgroundSize" !== b && (a -= (g || e).width * m)) : a = "backgroundSize" === b ? "auto" === d[0] ? e.width : d[0].match(/contain|cover/) ? l.Util.resizeBounds(e.width, e.height, c.width, c.height, d[0]).width : parseInt(d[0], 10) : parseInt(d[0], 10);
        "auto" === d[1] ? c = a / e.width * e.height : -1 !== d[1].toString().indexOf("%") ? (m = parseFloat(d[1]) / 100, c = c.height * m, "backgroundSize" !== b && (c -= (g || e).height * m)) : c = parseInt(d[1], 10);
        return [a, c]
    }
    var l = {}, b;
    l.Util = {};
    var e = String.prototype.trim;
    l.Util.trimText = function (b) {
        return e ? e.apply(b) : ((b || "") + "").replace(/^\s+|\s+$/g, "")
    };
    l.Util.parseBackgroundImage = function (b) {
        var d, c, e, a, g, m = [],
            f, p = 0,
            l = 0,
            h, t, n = function () {
                if (d) {
                    '"' === c.substr(0, 1) && (c = c.substr(1, c.length - 2));
                    c && t.push(c);
                    if ("-" === d.substr(0, 1) && 0 < (a = d.indexOf("-", 1) + 1)) e = d.substr(0, a), d = d.substr(a);
                    m.push({
                        prefix: e,
                        method: d.toLowerCase(),
                        value: g,
                        args: t
                    })
                }
                t = [];
                d = e = c = g = ""
            };
        n();
        for (var x = 0, S = b.length; x < S; x++)
            if (f = b[x], !(0 === p && -1 < " \r\n\t".indexOf(f))) {
                switch (f) {
                case '"':
                    h ? h === f && (h = null) : h = f;
                    break;
                case "(":
                    if (h) break;
                    else if (0 === p) {
                        p = 1;
                        g += f;
                        continue
                    } else l++;
                    break;
                case ")":
                    if (h) break;
                    else if (1 === p)
                        if (0 === l) {
                            p = 0;
                            g += f;
                            n();
                            continue
                        } else l--;
                    break;
                case ",":
                    if (!h)
                        if (0 === p) {
                            n();
                            continue
                        } else if (1 === p && 0 === l && !d.match(/^url$/i)) {
                        t.push(c);
                        c = "";
                        g += f;
                        continue
                    }
                }
                g += f;
                0 === p ? d += f : c += f
            }
        n();
        return m
    };
    l.Util.Bounds = function (b) {
        var d = {};
        if (b.getBoundingClientRect) return b = b.getBoundingClientRect(), d.top = b.top, d.bottom = b.bottom || b.top + b.height, d.left = b.left, d.width = b.width || b.right - b.left, d.height = b.height || b.bottom - b.top, d
    };
    l.Util.getCSS = function (e, I, c) {
        function ha(a, c) {
            var b = e.runtimeStyle && e.runtimeStyle[a],
                d, g = e.style;
            !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(c) && /^-?\d/.test(c) && (d = g.left, b && (e.runtimeStyle.left = e.currentStyle.left), g.left = "fontSize" === a ? "1em" : c || 0, c = g.pixelLeft + "px", g.left = d, b && (e.runtimeStyle.left = b));
            return !/^(thin|medium|thick)$/i.test(c) ? Math.round(parseFloat(c)) + "px" : c
        }
        var a, g = I.match(/^background(Size|Position)$/);
        void 0 !== e && (b = n.defaultView.getComputedStyle(e, null));
        a = b[I];
        if (g) {
            if (a = (a || "").split(","), a = a[c || 0] || a[0] || "auto", a = l.Util.trimText(a).split(" "), !("backgroundSize" === I && (!a[0] || a[0].match(/cover|contain|auto/)))) {
                a[0] = -1 === a[0].indexOf("%") ? ha(I + "X", a[0]) : a[0];
                if (a[1] === d) {
                    if ("backgroundSize" === I) return a[1] = "auto", a;
                    a[1] = a[0]
                }
                a[1] = -1 === a[1].indexOf("%") ? ha(I + "Y", a[1]) : a[1]
            }
        } else /border(Top|Bottom)(Left|Right)Radius/.test(I) && (I = a.split(" "), 1 >= I.length && (I[1] = I[0]), I[0] = parseInt(I[0], 10), I[1] = parseInt(I[1], 10), a = I);
        return a
    };
    l.Util.resizeBounds = function (b, d, c, e, a) {
        b /= d;
        !a || "auto" === a ? (a = c, c = e) : c / e < b ^ "contain" === a ? (c = e, a = e * b) : (a = c, c /= b);
        return {
            width: a,
            height: c
        }
    };
    l.Util.BackgroundPosition = function (b, d, c, e, a) {
        b = f("backgroundPosition", b, d, c, e, a);
        return {
            left: b[0],
            top: b[1]
        }
    };
    l.Util.BackgroundSize = function (b, d, c, e) {
        b = f("backgroundSize", b, d, c, e);
        return {
            width: b[0],
            height: b[1]
        }
    };
    l.Util.Extend = function (b, d) {
        for (var c in b) b.hasOwnProperty(c) && (d[c] = b[c]);
        return d
    };
    l.Util.Children = function (b) {
        var e;
        try {
            var c;
            if (b.nodeName && "IFRAME" === b.nodeName.toUpperCase()) c = b.contentDocument || b.contentWindow.document;
            else {
                var m = b.childNodes;
                b = [];
                if (null !== m) {
                    var a = b.length,
                        g = 0;
                    if ("number" === typeof m.length)
                        for (var f = m.length; g < f; g++) b[a++] = m[g];
                    else
                        for (; m[g] !== d;) b[a++] = m[g++];
                    b.length = a
                }
                c = b
            }
            e = c
        } catch (l) {
            x("html2canvas.Util.Children failed with exception: " + l.message), e = []
        }
        return e
    };
    var m = {};
    l.Util.Font = function (b, e, c) {
        if (m[b + "-" + e] !== d) return m[b + "-" + e];
        var f = c.createElement("div"),
            a = c.createElement("img"),
            g = c.createElement("span"),
            l;
        f.style.visibility = "hidden";
        f.style.fontFamily = b;
        f.style.fontSize = e;
        f.style.margin = 0;
        f.style.padding = 0;
        c.body.appendChild(f);
        a.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";
        a.width = 1;
        a.height = 1;
        a.style.margin = 0;
        a.style.padding = 0;
        a.style.verticalAlign = "baseline";
        g.style.fontFamily = b;
        g.style.fontSize = e;
        g.style.margin = 0;
        g.style.padding = 0;
        g.appendChild(c.createTextNode("Hidden Text"));
        f.appendChild(g);
        f.appendChild(a);
        l = a.offsetTop - g.offsetTop + 1;
        f.removeChild(g);
        f.appendChild(c.createTextNode("Hidden Text"));
        f.style.lineHeight = "normal";
        a.style.verticalAlign = "super";
        a = {
            baseline: l,
            lineWidth: 1,
            middle: a.offsetTop - f.offsetTop + 1
        };
        m[b + "-" + e] = a;
        c.body.removeChild(f);
        return a
    };
    l.Generate = {};
    var t = [/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/, /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/, /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/, /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/];
    l.Generate.parseGradient = function (b, d) {
        var c, e, a = t.length,
            g, f, m, p;
        for (e = 0; e < a && !(g = b.match(t[e])); e += 1);
        if (g) switch (g[1]) {
        case "-webkit-linear-gradient":
        case "-o-linear-gradient":
            c = {
                type: "linear",
                x0: null,
                y0: null,
                x1: null,
                y1: null,
                colorStops: []
            };
            if (a = g[2].match(/\w+/g)) {
                f = a.length;
                for (e = 0; e < f; e += 1) switch (a[e]) {
                case "top":
                    c.y0 = 0;
                    c.y1 = d.height;
                    break;
                case "right":
                    c.x0 = d.width;
                    c.x1 = 0;
                    break;
                case "bottom":
                    c.y0 = d.height;
                    c.y1 = 0;
                    break;
                case "left":
                    c.x0 = 0, c.x1 = d.width
                }
            }
            null === c.x0 && null === c.x1 && (c.x0 = c.x1 = d.width / 2);
            null === c.y0 && null === c.y1 && (c.y0 = c.y1 = d.height / 2);
            if (a = g[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g)) {
                f = a.length;
                m = 1 / Math.max(f - 1, 1);
                for (e = 0; e < f; e += 1) p = a[e].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/), p[2] ? (g = parseFloat(p[2]), g = "%" === p[3] ? g / 100 : g / d.width) : g = e * m, c.colorStops.push({
                    color: p[1],
                    stop: g
                })
            }
            break;
        case "-webkit-gradient":
            c = {
                type: "radial" === g[2] ? "circle" : g[2],
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0,
                colorStops: []
            };
            if (a = g[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/)) c.x0 = a[1] * d.width / 100, c.y0 = a[2] * d.height / 100, c.x1 = a[3] * d.width / 100, c.y1 = a[4] * d.height / 100;
            if (a = g[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g)) {
                f = a.length;
                for (e = 0; e < f; e += 1) p = a[e].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/), g = parseFloat(p[2]), "from" === p[1] && (g = 0), "to" === p[1] && (g = 1), c.colorStops.push({
                    color: p[3],
                    stop: g
                })
            }
            break;
        case "-moz-linear-gradient":
            c = {
                type: "linear",
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0,
                colorStops: []
            };
            if (a = g[2].match(/(\d{1,3})%?\s(\d{1,3})%?/)) c.x0 = a[1] * d.width / 100, c.y0 = a[2] * d.height / 100, c.x1 = d.width - c.x0, c.y1 = d.height - c.y0;
            if (a = g[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g)) {
                f = a.length;
                m = 1 / Math.max(f - 1, 1);
                for (e = 0; e < f; e += 1) p = a[e].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/), p[2] ? (g = parseFloat(p[2]), p[3] && (g /= 100)) : g = e * m, c.colorStops.push({
                    color: p[1],
                    stop: g
                })
            }
            break;
        case "-webkit-radial-gradient":
        case "-moz-radial-gradient":
        case "-o-radial-gradient":
            c = {
                type: "circle",
                x0: 0,
                y0: 0,
                x1: d.width,
                y1: d.height,
                cx: 0,
                cy: 0,
                rx: 0,
                ry: 0,
                colorStops: []
            };
            if (a = g[2].match(/(\d{1,3})%?\s(\d{1,3})%?/)) c.cx = a[1] * d.width / 100, c.cy = a[2] * d.height / 100;
            a = g[3].match(/\w+/);
            p = g[4].match(/[a-z\-]*/);
            if (a && p) switch (p[0]) {
            case "farthest-corner":
            case "cover":
            case "":
                e = Math.sqrt(Math.pow(c.cx, 2) + Math.pow(c.cy, 2));
                a = Math.sqrt(Math.pow(c.cx, 2) + Math.pow(c.y1 - c.cy, 2));
                f = Math.sqrt(Math.pow(c.x1 - c.cx, 2) + Math.pow(c.y1 - c.cy, 2));
                p = Math.sqrt(Math.pow(c.x1 - c.cx, 2) + Math.pow(c.cy, 2));
                c.rx = c.ry = Math.max(e, a, f, p);
                break;
            case "closest-corner":
                e = Math.sqrt(Math.pow(c.cx, 2) + Math.pow(c.cy, 2));
                a = Math.sqrt(Math.pow(c.cx, 2) + Math.pow(c.y1 - c.cy, 2));
                f = Math.sqrt(Math.pow(c.x1 - c.cx, 2) + Math.pow(c.y1 - c.cy, 2));
                p = Math.sqrt(Math.pow(c.x1 - c.cx, 2) + Math.pow(c.cy, 2));
                c.rx = c.ry = Math.min(e, a, f, p);
                break;
            case "farthest-side":
                "circle" === a[0] ? c.rx = c.ry = Math.max(c.cx, c.cy, c.x1 - c.cx, c.y1 - c.cy) : (c.type = a[0], c.rx = Math.max(c.cx, c.x1 - c.cx), c.ry = Math.max(c.cy, c.y1 - c.cy));
                break;
            case "closest-side":
            case "contain":
                "circle" === a[0] ? c.rx = c.ry = Math.min(c.cx, c.cy, c.x1 - c.cx, c.y1 - c.cy) : (c.type = a[0], c.rx = Math.min(c.cx, c.x1 - c.cx), c.ry = Math.min(c.cy, c.y1 - c.cy))
            }
            if (a = g[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g)) {
                f = a.length;
                m = 1 / Math.max(f - 1, 1);
                for (e = 0; e < f; e += 1) p = a[e].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/), p[2] ? (g = parseFloat(p[2]), g = "%" === p[3] ? g / 100 : g / d.width) : g = e * m, c.colorStops.push({
                    color: p[1],
                    stop: g
                })
            }
        }
        return c
    };
    l.Generate.Gradient = function (b, d) {
        if (!(0 === d.width || 0 === d.height)) {
            var c = n.createElement("canvas"),
                e = c.getContext("2d"),
                a, g, f, m;
            c.width = d.width;
            c.height = d.height;
            if (a = l.Generate.parseGradient(b, d))
                if ("linear" === a.type) {
                    g = e.createLinearGradient(a.x0, a.y0, a.x1, a.y1);
                    f = 0;
                    for (m = a.colorStops.length; f < m; f += 1) try {
                        g.addColorStop(a.colorStops[f].stop, a.colorStops[f].color)
                    } catch (p) {
                        x(["failed to add color stop: ", p, "; tried to add: ", a.colorStops[f], "; stop: ", f, "; in: ", b])
                    }
                    e.fillStyle = g;
                    e.fillRect(0, 0, d.width, d.height)
                } else if ("circle" === a.type) {
                g = e.createRadialGradient(a.cx, a.cy, 0, a.cx, a.cy, a.rx);
                f = 0;
                for (m = a.colorStops.length; f < m; f += 1) try {
                    g.addColorStop(a.colorStops[f].stop, a.colorStops[f].color)
                } catch (h) {
                    x(["failed to add color stop: ", h, "; tried to add: ", a.colorStops[f], "; stop: ", f, "; in: ", b])
                }
                e.fillStyle = g;
                e.fillRect(0, 0, d.width, d.height)
            } else if ("ellipse" === a.type) {
                var t = n.createElement("canvas"),
                    R = t.getContext("2d");
                g = Math.max(a.rx, a.ry);
                var T = 2 * g;
                t.width = t.height = T;
                g = R.createRadialGradient(a.rx, a.ry, 0, a.rx, a.ry, g);
                f = 0;
                for (m = a.colorStops.length; f < m; f += 1) try {
                    g.addColorStop(a.colorStops[f].stop, a.colorStops[f].color)
                } catch (U) {
                    x(["failed to add color stop: ", U, "; tried to add: ", a.colorStops[f], "; stop: ", f, "; in: ", b])
                }
                R.fillStyle = g;
                R.fillRect(0, 0, T, T);
                e.fillStyle = a.colorStops[f - 1].color;
                e.fillRect(0, 0, c.width, c.height);
                e.drawImage(t, a.cx - a.rx, a.cy - a.ry, 2 * a.rx, 2 * a.ry)
            }
            return c
        }
    };
    l.Generate.ListAlpha = function (b) {
        var d = "",
            c;
        do c = b % 26, d = String.fromCharCode(c + 64) + d, b /= 26; while (26 < 26 * b);
        return d
    };
    l.Generate.ListRoman = function (b) {
        var d = "M CM D CD C XC L XL X IX V IV I".split(" "),
            c = [1E3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
            e = "",
            a, g = d.length;
        if (0 >= b || 4E3 <= b) return b;
        for (a = 0; a < g; a += 1)
            for (; b >= c[a];) b -= c[a], e += d[a];
        return e
    };
    l.Parse = function (b, e) {
        function c() {
            return Math.max(Math.max(w.body.scrollWidth, w.documentElement.scrollWidth), Math.max(w.body.offsetWidth, w.documentElement.offsetWidth), Math.max(w.body.clientWidth, w.documentElement.clientWidth))
        }

        function f() {
            return Math.max(Math.max(w.body.scrollHeight, w.documentElement.scrollHeight), Math.max(w.body.offsetHeight, w.documentElement.offsetHeight), Math.max(w.body.clientHeight, w.documentElement.clientHeight))
        }

        function a(a, b) {
            var c = parseInt(K(a, b), 10);
            return isNaN(c) ? 0 : c
        }

        function g(a, b, c, d, e, g) {
            "transparent" !== g && (a.setVariable("fillStyle", g), a.fillRect(b, c, d, e))
        }

        function m(a, b) {
            switch (b) {
            case "lowercase":
                return a.toLowerCase();
            case "capitalize":
                return a.replace(/(^|\s|:|-|\(|\))([a-z])/g, function (a, b, c) {
                    if (0 < a.length) return b + c.toUpperCase()
                });
            case "uppercase":
                return a.toUpperCase();
            default:
                return a
            }
        }

        function t(a, b, c, d) {
            var e = K(b, "fontWeight"),
                g = K(b, "fontFamily"),
                f = K(b, "fontSize");
            switch (parseInt(e, 10)) {
            case 401:
                e = "bold";
                break;
            case 400:
                e = "normal"
            }
            a.setVariable("fillStyle", d);
            a.setVariable("font", [K(b, "fontStyle"), K(b, "fontVariant"), e, f, g].join(" "));
            a.setVariable("textAlign", "left");
            if ("none" !== c) return l.Util.Font(g, f, w)
        }

        function p(a, b, c) {
            var d = c.ctx,
                f = K(a, "color"),
                N = K(a, "textDecoration");
            c = K(a, "textAlign");
            var p, q, h = b,
                n = 0;
            if (0 < l.Util.trimText(b.nodeValue).length) {
                b.nodeValue = m(b.nodeValue, K(a, "textTransform"));
                c = c.replace(["-webkit-auto"], ["auto"]);
                var y;
                if (y = !e.letterRendering) {
                    if (c = /^(left|right|justify|auto)$/.test(c)) c = K(a, "letterSpacing"), c = /^(normal|none|0px)$/.test(c);
                    y = c
                }
                q = y ? b.nodeValue.split(/(\b| )/) : b.nodeValue.split("");
                p = t(d, a, N, f);
                e.chinese && q.forEach(function (a, b) {
                    /.*[\u4E00-\u9FA5].*$/.test(a) && (a = a.split(""), a.unshift(b, 1), q.splice.apply(q, a))
                });
                q.forEach(function (a, b) {
                    var c;
                    c = b < q.length - 1;
                    var e;
                    if (z.rangeBounds) {
                        if ("none" !== N || 0 !== l.Util.trimText(a).length) {
                            c = h;
                            e = n;
                            var j = w.createRange();
                            j.setStart(c, e);
                            j.setEnd(c, e + a.length);
                            e = j.getBoundingClientRect()
                        }
                        n += a.length
                    } else if (h && "string" === typeof h.nodeValue) {
                        c = c ? h.splitText(a.length) : null;
                        var r = h;
                        e = r.parentNode;
                        var j = w.createElement("wrapper"),
                            m = r.cloneNode(!0);
                        j.appendChild(r.cloneNode(!0));
                        e.replaceChild(j, r);
                        r = l.Util.Bounds(j);
                        e.replaceChild(m, j);
                        e = r;
                        h = c
                    }
                    if (c = e) switch (e = c.left, j = c.bottom, null !== a && 0 < l.Util.trimText(a).length && d.fillText(a, e, j), N) {
                    case "underline":
                        g(d, c.left, Math.round(c.top + p.baseline + p.lineWidth), c.width, 1, f);
                        break;
                    case "overline":
                        g(d, c.left, Math.round(c.top), c.width, 1, f);
                        break;
                    case "line-through":
                        g(d, c.left, Math.ceil(c.top + p.middle + p.lineWidth), c.width, 1, f)
                    }
                })
            }
        }

        function J(a) {
            return (a = b[a]) && !0 === a.succeeded ? a.img : !1
        }

        function Q(a, b) {
            var c = Math.max(a.left, b.left),
                d = Math.max(a.top, b.top),
                e = Math.min(a.left + a.width, b.left + b.width),
                g = Math.min(a.top + a.height, b.top + b.height);
            return {
                left: c,
                top: d,
                width: e - c,
                height: g - d
            }
        }

        function R(b, c, d, e, g) {
            var f = a(c, "paddingLeft"),
                w = a(c, "paddingTop"),
                z = a(c, "paddingRight");
            c = a(c, "paddingBottom");
            A(b, d, 0, 0, d.width, d.height, e.left + f + g[3].width, e.top + w + g[0].width, e.width - (g[1].width + g[3].width + f + z), e.height - (g[0].width + g[2].width + w + c))
        }

        function T(a, b, c, d) {
            var e = function (a, b, c) {
                return {
                    x: a.x + (b.x - a.x) * c,
                    y: a.y + (b.y - a.y) * c
                }
            };
            return {
                start: a,
                startControl: b,
                endControl: c,
                end: d,
                subdivide: function (g) {
                    var f = e(a, b, g),
                        w = e(b, c, g),
                        z = e(c, d, g),
                        N = e(f, w, g),
                        w = e(w, z, g);
                    g = e(N, w, g);
                    return [T(a, f, N, g), T(g, w, z, d)]
                },
                curveTo: function (a) {
                    a.push(["bezierCurve", b.x, b.y, c.x, c.y, d.x, d.y])
                },
                curveToReversed: function (d) {
                    d.push(["bezierCurve", c.x, c.y, b.x, b.y, a.x, a.y])
                }
            }
        }

        function U(a, b, c, d, e, g, f) {
            0 < b[0] || 0 < b[1] ? (a.push(["line", d[0].start.x, d[0].start.y]), d[0].curveTo(a), d[1].curveTo(a)) : a.push(["line", g, f]);
            (0 < c[0] || 0 < c[1]) && a.push(["line", e[0].start.x, e[0].start.y])
        }

        function S(a, b, c, d, e, g, f) {
            var w = [];
            0 < b[0] || 0 < b[1] ? (w.push(["line", d[1].start.x, d[1].start.y]), d[1].curveTo(w)) : w.push(["line", a.c1[0], a.c1[1]]);
            0 < c[0] || 0 < c[1] ? (w.push(["line", g[0].start.x, g[0].start.y]), g[0].curveTo(w), w.push(["line", f[0].end.x, f[0].end.y]), f[0].curveToReversed(w)) : (w.push(["line", a.c2[0], a.c2[1]]), w.push(["line", a.c3[0], a.c3[1]]));
            0 < b[0] || 0 < b[1] ? (w.push(["line", e[1].end.x, e[1].end.y]), e[1].curveToReversed(w)) : w.push(["line", a.c4[0], a.c4[1]]);
            return w
        }

        function D(a, b) {
            var c = a.drawShape();
            b.forEach(function (a, b) {
                c[0 === b ? "moveTo" : a[0] + "To"].apply(null, a.slice(1))
            });
            return c
        }

        function C(a, b, c) {
            var d = w.createElement("valuewrap");
            "lineHeight textAlign fontFamily color fontSize paddingLeft paddingTop width height border borderLeftWidth borderTopWidth".split(" ").forEach(function (b) {
                try {
                    d.style[b] = K(a, b)
                } catch (c) {
                    x("html2canvas: Parse: Exception caught in renderFormValue: " + c.message)
                }
            });
            d.style.borderColor = "black";
            d.style.borderStyle = "solid";
            d.style.display = "block";
            d.style.position = "absolute";
            if (/^(submit|reset|button|text|password)$/.test(a.type) || "SELECT" === a.nodeName) d.style.lineHeight = K(a, "height");
            d.style.top = b.top + "px";
            d.style.left = b.left + "px";
            b = "SELECT" === a.nodeName ? (a.options[a.selectedIndex] || 0).text : a.value;
            b || (b = a.placeholder);
            b = w.createTextNode(b);
            d.appendChild(b);
            ba.appendChild(d);
            p(a, b, c);
            ba.removeChild(d)
        }

        function A(a) {
            a.drawImage.apply(a, Array.prototype.slice.call(arguments, 1))
        }

        function Y(a, b) {
            var c = h.getComputedStyle(a, b);
            if (c && c.content && !("none" === c.content || "-moz-alt-content" === c.content)) {
                var d = c.content + "",
                    e = d.substr(0, 1);
                e === d.substr(d.length - 1) && e.match(/'|"/) && (d = d.substr(1, d.length - 2));
                var e = "url" === d.substr(0, 3),
                    g = n.createElement(e ? "img" : "span");
                g.className = ia + "-before " + ia + "-after";
                Object.keys(c).filter(s).forEach(function (a) {
                    g.style[a] = c[a]
                });
                e ? g.src = l.Util.parseBackgroundImage(d)[0].args[0] : g.innerHTML = d;
                return g
            }
        }

        function s(a) {
            return isNaN(h.parseInt(a, 10))
        }

        function q(a, b, c, d) {
            var e = Math.round(d.left + c.left);
            c = Math.round(d.top + c.top);
            a.createPattern(b);
            a.translate(e, c);
            a.fill();
            a.translate(-e, -c)
        }

        function F(a, b, c, d, e, g, f, w) {
            var z = [];
            z.push(["line", Math.round(e), Math.round(g)]);
            z.push(["line", Math.round(e + f), Math.round(g)]);
            z.push(["line", Math.round(e + f), Math.round(w + g)]);
            z.push(["line", Math.round(e), Math.round(w + g)]);
            D(a, z);
            a.save();
            a.clip();
            q(a, b, c, d);
            a.restore()
        }

        function V(a, b, c, d, e) {
            var g = l.Util.BackgroundSize(a, b, d, e),
                f = l.Util.BackgroundPosition(a, b, d, e, g);
            a = K(a, "backgroundRepeat").split(",").map(function (a) {
                return a.trim()
            });
            if (!(d.width === g.width && d.height === g.height)) {
                var z, N = w.createElement("canvas");
                N.width = g.width;
                N.height = g.height;
                z = N.getContext("2d");
                A(z, d, 0, 0, d.width, d.height, 0, 0, g.width, g.height);
                d = N
            }
            a = a[e] || a[0];
            switch (a) {
            case "repeat-x":
                F(c, d, f, b, b.left, b.top + f.top, 99999, d.height);
                break;
            case "repeat-y":
                F(c, d, f, b, b.left + f.left, b.top, d.width, 99999);
                break;
            case "no-repeat":
                F(c, d, f, b, b.left + f.left, b.top + f.top, d.width, d.height);
                break;
            default:
                q(c, d, f, {
                    top: b.top,
                    left: b.left,
                    width: d.width,
                    height: d.height
                })
            }
        }

        function O(b, d, j) {
            var z, N, p, m, q, h, n, y, s = l.Util.Bounds(b),
                G, E = sa.test(b.nodeName) ? "#efefef" : K(b, "backgroundColor"),
                F;
            F = !d ? c() : s.width;
            var v = !d ? f() : s.height,
                ba = [];
            F = {
                storage: ba,
                width: F,
                height: v,
                clip: function () {
                    ba.push({
                        type: "function",
                        name: "clip",
                        arguments: arguments
                    })
                },
                translate: function () {
                    ba.push({
                        type: "function",
                        name: "translate",
                        arguments: arguments
                    })
                },
                fill: function () {
                    ba.push({
                        type: "function",
                        name: "fill",
                        arguments: arguments
                    })
                },
                save: function () {
                    ba.push({
                        type: "function",
                        name: "save",
                        arguments: arguments
                    })
                },
                restore: function () {
                    ba.push({
                        type: "function",
                        name: "restore",
                        arguments: arguments
                    })
                },
                fillRect: function () {
                    ba.push({
                        type: "function",
                        name: "fillRect",
                        arguments: arguments
                    })
                },
                createPattern: function () {
                    ba.push({
                        type: "function",
                        name: "createPattern",
                        arguments: arguments
                    })
                },
                drawShape: function () {
                    var a = [];
                    ba.push({
                        type: "function",
                        name: "drawShape",
                        arguments: a
                    });
                    return {
                        moveTo: function () {
                            a.push({
                                name: "moveTo",
                                arguments: arguments
                            })
                        },
                        lineTo: function () {
                            a.push({
                                name: "lineTo",
                                arguments: arguments
                            })
                        },
                        arcTo: function () {
                            a.push({
                                name: "arcTo",
                                arguments: arguments
                            })
                        },
                        bezierCurveTo: function () {
                            a.push({
                                name: "bezierCurveTo",
                                arguments: arguments
                            })
                        },
                        quadraticCurveTo: function () {
                            a.push({
                                name: "quadraticCurveTo",
                                arguments: arguments
                            })
                        }
                    }
                },
                drawImage: function () {
                    ba.push({
                        type: "function",
                        name: "drawImage",
                        arguments: arguments
                    })
                },
                fillText: function () {
                    ba.push({
                        type: "function",
                        name: "fillText",
                        arguments: arguments
                    })
                },
                setVariable: function (a, b) {
                    ba.push({
                        type: "variable",
                        name: a,
                        arguments: b
                    })
                }
            };
            z = K(b, "zIndex");
            (v = d ? d.zIndex : null) ? "auto" !== z && (z = {
                zindex: z,
                children: []
            }, v.children.push(z), v = z) : v = z = {
                zindex: 0,
                children: []
            };
            z = K(b, "opacity") * (d ? d.opacity : 1);
            F.setVariable("globalAlpha", z);
            var fa = K(b, "position"),
                ea;
            ea = ["Top", "Right", "Bottom", "Left"].map(function (c) {
                return {
                    width: a(b, "border" + c + "Width"),
                    color: K(b, "border" + c + "Color")
                }
            });
            d = {
                ctx: F,
                zIndex: v,
                opacity: z,
                cssPosition: fa,
                borders: ea,
                clip: d && d.clip ? l.Util.Extend({}, d.clip) : null
            };
            !0 === e.useOverflow && (!0 === /(hidden|scroll|auto)/.test(K(b, "overflow")) && !1 === /(BODY)/i.test(b.nodeName)) && (d.clip = d.clip ? Q(d.clip, s) : s);
            d.zIndex.children.push(d);
            var v = d.borders,
                W = d.ctx;
            F = d.clip;
            z = {
                left: s.left + v[3].width,
                top: s.top + v[0].width,
                width: s.width - (v[1].width + v[3].width),
                height: s.height - (v[0].width + v[2].width)
            };
            F && (z = Q(z, F));
            F = z;
            fa = s.left;
            ea = s.top;
            var T = s.width,
                ja = s.height,
                X, L, P, H, O, da, B;
            B = ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (a) {
                return K(b, "border" + a + "Radius")
            });
            var A = s.left;
            y = s.top;
            h = s.width;
            n = s.height;
            N = B[0][0];
            p = B[0][1];
            m = B[1][0];
            q = B[1][1];
            H = B[2][0];
            O = B[2][1];
            X = B[3][0];
            L = B[3][1];
            var ka = h - m,
                ga = n - H,
                pa = h - O;
            P = n - L;
            z = $(A, y, N, p).topLeft.subdivide(0.5);
            N = $(A + v[3].width, y + v[0].width, Math.max(0, N - v[3].width), Math.max(0, p - v[0].width)).topLeft.subdivide(0.5);
            p = $(A + ka, y, m, q).topRight.subdivide(0.5);
            m = $(A + Math.min(ka, h + v[3].width), y + v[0].width, ka > h + v[3].width ? 0 : m - v[3].width, q - v[0].width).topRight.subdivide(0.5);
            q = $(A + pa, y + ga, O, H).bottomRight.subdivide(0.5);
            h = $(A + Math.min(pa, h + v[3].width), y + Math.min(ga, n + v[0].width), Math.max(0, O - v[1].width), Math.max(0, H - v[2].width)).bottomRight.subdivide(0.5);
            n = $(A, y + P, X, L).bottomLeft.subdivide(0.5);
            y = $(A + v[3].width, y + P, Math.max(0, X - v[3].width), Math.max(0, L - v[2].width)).bottomLeft.subdivide(0.5);
            ga = [];
            switch (K(b, "backgroundClip")) {
            case "content-box":
            case "padding-box":
                U(ga, B[0], B[1], N, m, s.left + v[3].width, s.top + v[0].width);
                U(ga, B[1], B[2], m, h, s.left + s.width - v[1].width, s.top + v[0].width);
                U(ga, B[2], B[3], h, y, s.left + s.width - v[1].width, s.top + s.height - v[2].width);
                U(ga, B[3], B[0], y, N, s.left + v[3].width, s.top + s.height - v[2].width);
                break;
            default:
                U(ga, B[0], B[1], z, p, s.left, s.top), U(ga, B[1], B[2], p, q, s.left + s.width, s.top), U(ga, B[2], B[3], q, n, s.left + s.width, s.top + s.height), U(ga, B[3], B[0], n, z, s.left, s.top + s.height)
            }
            A = [];
            for (X = 0; 4 > X; X++)
                if (0 < v[X].width) {
                    L = fa;
                    P = ea;
                    H = T;
                    O = ja - v[2].width;
                    switch (X) {
                    case 0:
                        O = v[0].width;
                        da = S({
                            c1: [L, P],
                            c2: [L + H, P],
                            c3: [L + H - v[1].width, P + O],
                            c4: [L + v[3].width, P + O]
                        }, B[0], B[1], z, N, p, m);
                        break;
                    case 1:
                        L = fa + T - v[1].width;
                        H = v[1].width;
                        da = S({
                            c1: [L + H, P],
                            c2: [L + H, P + O + v[2].width],
                            c3: [L, P + O],
                            c4: [L, P + v[0].width]
                        }, B[1], B[2], p, m, q, h);
                        break;
                    case 2:
                        P = P + ja - v[2].width;
                        O = v[2].width;
                        da = S({
                            c1: [L + H, P + O],
                            c2: [L, P + O],
                            c3: [L + v[3].width, P],
                            c4: [L + H - v[2].width, P]
                        }, B[2], B[3], q, h, n, y);
                        break;
                    case 3:
                        H = v[3].width, da = S({
                            c1: [L, P + O + v[2].width],
                            c2: [L, P],
                            c3: [L + H, P + v[0].width],
                            c4: [L + H, P + O]
                        }, B[3], B[0], n, y, z, N)
                    }
                    A.push({
                        args: da,
                        color: v[X].color
                    })
                }
            D(W, ga);
            W.save();
            W.clip();
            if (0 < F.height && 0 < F.width) {
                g(W, s.left, s.top, s.width, s.height, E);
                E = K(b, "backgroundImage");
                da = l.Util.parseBackgroundImage(E);
                for (fa = da.length; fa--;) E = da[fa], E.args && 0 !== E.args.length && ((z = J("url" === E.method ? E.args[0] : E.value)) ? V(b, F, W, z, fa) : x("html2canvas: Error loading background:", E))
            }
            W.restore();
            A.forEach(function (a) {
                var b = a.args;
                a = a.color;
                "transparent" !== a && (W.setVariable("fillStyle", a), D(W, b), W.fill())
            });
            if (!j && (j = Y(b, ":before"), E = Y(b, ":after"), j || E)) j && (b.className += " " + ia + "-before", b.parentNode.insertBefore(j, b), Z(j, d, !0), b.parentNode.removeChild(j), b.className = b.className.replace(ia + "-before", "").trim()), E && (b.className += " " + ia + "-after", b.appendChild(E), Z(E, d, !0), b.removeChild(E), b.className = b.className.replace(ia + "-after", "").trim());
            switch (b.nodeName) {
            case "IMG":
                (G = J(b.getAttribute("src"))) ? R(W, b, G, s, v) : x("html2canvas: Error loading <img>:" + b.getAttribute("src"));
                break;
            case "INPUT":
                /^(text|url|email|submit|button|reset)$/.test(b.type) && 0 < (b.value || b.placeholder).length && C(b, s, d);
                break;
            case "TEXTAREA":
                0 < (b.value || b.placeholder || "").length && C(b, s, d);
                break;
            case "SELECT":
                0 < (b.options || b.placeholder || "").length && C(b, s, d);
                break;
            case "LI":
                var aa, s = d.ctx;
                G = K(b, "listStyleType");
                if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(G)) {
                    j = -1;
                    E = 1;
                    da = b.parentNode.childNodes;
                    if (b.parentNode) {
                        for (; da[++j] !== b;) 1 === da[j].nodeType && E++;
                        j = E
                    } else j = -1;
                    switch (G) {
                    case "decimal":
                        aa = j;
                        break;
                    case "decimal-leading-zero":
                        aa = 1 === j.toString().length ? "0" + j.toString() : j.toString();
                        break;
                    case "upper-roman":
                        aa = l.Generate.ListRoman(j);
                        break;
                    case "lower-roman":
                        aa = l.Generate.ListRoman(j).toLowerCase();
                        break;
                    case "lower-alpha":
                        aa = l.Generate.ListAlpha(j).toLowerCase();
                        break;
                    case "upper-alpha":
                        aa = l.Generate.ListAlpha(j)
                    }
                    aa += ". ";
                    j = w.createElement("boundelement");
                    j.style.display = "inline";
                    E = b.style.listStyleType;
                    b.style.listStyleType = "none";
                    j.appendChild(w.createTextNode(aa));
                    b.insertBefore(j, b.firstChild);
                    G = l.Util.Bounds(j);
                    b.removeChild(j);
                    b.style.listStyleType = E;
                    t(s, b, "none", K(b, "color"));
                    "inside" === K(b, "listStylePosition") && (s.setVariable("textAlign", "left"), j = F.left, G = G.bottom, null !== aa && 0 < l.Util.trimText(aa).length && s.fillText(aa, j, G))
                }
                break;
            case "CANVAS":
                R(W, b, b, s, v)
            }
            return d
        }

        function Z(a, b, c) {
            "none" !== K(a, "display") && ("hidden" !== K(a, "visibility") && !a.hasAttribute("data-html2canvas-ignore")) && (b = O(a, b, c) || b, sa.test(a.nodeName) || l.Util.Children(a).forEach(function (d) {
                1 === d.nodeType ? Z(d, b, c) : 3 === d.nodeType && p(a, d, b)
            }))
        }
        h.scroll(0, 0);
        var N = e.elements === d ? n.body : e.elements[0],
            w = N.ownerDocument,
            z = l.Util.Support(e, w),
            sa = RegExp("(" + e.ignoreElements + ")"),
            ba = w.body,
            K = l.Util.getCSS,
            ia = "___html2canvas___pseudoelement",
            fa = w.createElement("style");
        fa.innerHTML = "." + ia + '-before:before { content: "" !important; display: none !important; }.' + ia + '-after:after { content: "" !important; display: none !important; }';
        ba.appendChild(fa);
        b = b || {};
        var $, L = 4 * ((Math.sqrt(2) - 1) / 3);
        $ = function (a, b, c, d) {
            var e = c * L,
                g = d * L;
            c = a + c;
            d = b + d;
            return {
                topLeft: T({
                    x: a,
                    y: d
                }, {
                    x: a,
                    y: d - g
                }, {
                    x: c - e,
                    y: b
                }, {
                    x: c,
                    y: b
                }),
                topRight: T({
                    x: a,
                    y: b
                }, {
                    x: a + e,
                    y: b
                }, {
                    x: c,
                    y: d - g
                }, {
                    x: c,
                    y: d
                }),
                bottomRight: T({
                    x: c,
                    y: b
                }, {
                    x: c,
                    y: b + g
                }, {
                    x: a + e,
                    y: d
                }, {
                    x: a,
                    y: d
                }),
                bottomLeft: T({
                    x: c,
                    y: d
                }, {
                    x: c - e,
                    y: d
                }, {
                    x: a,
                    y: b + g
                }, {
                    x: a,
                    y: b
                })
            }
        };
        var ea = O(N, null);
        if (z.svgRendering) {
            var da = n.documentElement,
                ja = function (a) {
                    a = l.Util.Children(a);
                    var b = a.length,
                        c, d, e, g, f;
                    for (f = 0; f < b; f += 1)
                        if (g = a[f], 3 === g.nodeType) H += g.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        else if (1 === g.nodeType && !/^(script|meta|title)$/.test(g.nodeName.toLowerCase())) {
                        H += "<" + g.nodeName.toLowerCase();
                        if (g.hasAttributes()) {
                            c = g.attributes;
                            e = c.length;
                            for (d = 0; d < e; d += 1) H += " " + c[d].name + '="' + c[d].value + '"'
                        }
                        H += ">";
                        ja(g);
                        H += "</" + g.nodeName.toLowerCase() + ">"
                    }
                }, G = new Image,
                E = c(),
                W = f(),
                H = "";
            ja(da);
            G.src = ["data:image/svg+xml,", "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='" + E + "' height='" + W + "'>", "<foreignObject width='" + E + "' height='" + W + "'>", "<html xmlns='http://www.w3.org/1999/xhtml' style='margin:0;'>", H.replace(/\#/g, "%23"), "</html></foreignObject></svg>"].join("");
            G.onload = function () {
                ea.svgRender = G
            }
        }
        Array.prototype.slice.call(N.children, 0).forEach(function (a) {
            Z(a, ea)
        });
        ea.backgroundColor = K(n.documentElement, "backgroundColor");
        ba.removeChild(fa);
        return ea
    };
    l.Preload = function (b) {
        function e() {
            x("html2canvas: start: images: " + p.numLoaded + " / " + p.numTotal + " (failed: " + p.numFailed + ")");
            !p.firstRun && p.numLoaded >= p.numTotal && (x("Finished loading images: # " + p.numTotal + " (failed: " + p.numFailed + ")"), "function" === typeof b.complete && b.complete(p))
        }

        function c(a, c, g) {
            var f, m = b.proxy,
                l;
            C.href = a;
            a = C.href;
            f = "html2canvas_" + T++;
            g.callbackname = f;
            m = -1 < m.indexOf("?") ? m + "&" : m + "?";
            m += "url=" + encodeURIComponent(a) + "&callback=" + f;
            l = U.createElement("script");
            h[f] = function (a) {
                "error:" === a.substring(0, 6) ? (g.succeeded = !1, p.numLoaded++, p.numFailed++, e()) : (t(c, g), c.src = a);
                h[f] = d;
                try {
                    delete h[f]
                } catch (b) {}
                l.parentNode.removeChild(l);
                l = null;
                delete g.script;
                delete g.callbackname
            };
            l.setAttribute("type", "text/javascript");
            l.setAttribute("src", m);
            g.script = l;
            h.document.body.appendChild(l)
        }

        function f(a, b) {
            var c = h.getComputedStyle(a, b),
                d = c.content;
            "url" === d.substr(0, 3) && Q.loadImage(l.Util.parseBackgroundImage(d)[0].args[0]);
            g(c.backgroundImage, a)
        }

        function a(a) {
            return a && a.method && a.args && 0 < a.args.length
        }

        function g(b, c) {
            var g;
            l.Util.parseBackgroundImage(b).filter(a).forEach(function (a) {
                if ("url" === a.method) Q.loadImage(a.args[0]);
                else if (a.method.match(/\-?gradient$/)) {
                    g === d && (g = l.Util.Bounds(c));
                    a = a.value;
                    var b = l.Generate.Gradient(a, g);
                    b !== d && (p[a] = {
                        img: b,
                        succeeded: !0
                    }, p.numTotal++, p.numLoaded++, e())
                }
            })
        }

        function m(a) {
            var b = !1;
            try {
                l.Util.Children(a).forEach(function (a) {
                    m(a)
                })
            } catch (c) {}
            try {
                b = a.nodeType
            } catch (e) {
                b = !1, x("html2canvas: failed to access some element's nodeType - Exception: " + e.message)
            }
            if (1 === b || b === d) {
                f(a, ":before");
                f(a, ":after");
                try {
                    g(l.Util.getCSS(a, "backgroundImage"), a)
                } catch (p) {
                    x("html2canvas: failed to get background-image - Exception: " + p.message)
                }
                g(a)
            }
        }

        function t(a, g) {
            a.onload = function () {
                g.timer !== d && h.clearTimeout(g.timer);
                p.numLoaded++;
                g.succeeded = !0;
                a.onerror = a.onload = null;
                e()
            };
            a.onerror = function () {
                if ("anonymous" === a.crossOrigin && (h.clearTimeout(g.timer), b.proxy)) {
                    var d = a.src;
                    a = new Image;
                    g.img = a;
                    a.src = d;
                    c(a.src, a, g);
                    return
                }
                p.numLoaded++;
                p.numFailed++;
                g.succeeded = !1;
                a.onerror = a.onload = null;
                e()
            }
        }
        var p = {
            numLoaded: 0,
            numFailed: 0,
            numTotal: 0,
            cleanupDone: !1
        }, J, Q, R, T = 0;
        R = b.elements[0] || n.body;
        var U = R.ownerDocument,
            S = U.images,
            D = S.length,
            C = U.createElement("a"),
            A;
        A = (new Image).crossOrigin !== d;
        var Y;
        C.href = h.location.href;
        J = C.protocol + C.host;
        Q = {
            loadImage: function (a) {
                var e, g;
                a && p[a] === d && (e = new Image, a.match(/data:image\/.*;base64,/i) ? (e.src = a.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ""), g = p[a] = {
                    img: e
                }, p.numTotal++, t(e, g)) : (C.href = a, C.href = C.href, C.protocol + C.host === J || !0 === b.allowTaint ? (g = p[a] = {
                    img: e
                }, p.numTotal++, t(e, g), e.src = a) : A && !b.allowTaint && b.useCORS ? (e.crossOrigin = "anonymous", g = p[a] = {
                    img: e
                }, p.numTotal++, t(e, g), e.src = a, e.customComplete = function () {
                    if (this.img.complete) this.img.onerror();
                    else this.timer = h.setTimeout(this.img.customComplete, 100)
                }.bind(g), e.customComplete()) : b.proxy && (g = p[a] = {
                    img: e
                }, p.numTotal++, c(a, e, g))))
            },
            cleanupDOM: function (a) {
                var c, g;
                if (!p.cleanupDone) {
                    a && "string" === typeof a ? x("html2canvas: Cleanup because: " + a) : x("html2canvas: Cleanup after timeout: " + b.timeout + " ms.");
                    for (g in p)
                        if (p.hasOwnProperty(g) && (c = p[g], "object" === typeof c && c.callbackname && c.succeeded === d)) {
                            h[c.callbackname] = d;
                            try {
                                delete h[c.callbackname]
                            } catch (f) {}
                            c.script && c.script.parentNode && (c.script.setAttribute("src", "about:blank"), c.script.parentNode.removeChild(c.script));
                            p.numLoaded++;
                            p.numFailed++;
                            x("html2canvas: Cleaned up failed img: '" + g + "' Steps: " + p.numLoaded + " / " + p.numTotal)
                        }
                    h.stop !== d ? h.stop() : n.execCommand !== d && n.execCommand("Stop", !1);
                    n.close !== d && n.close();
                    p.cleanupDone = !0;
                    a && "string" === typeof a || e()
                }
            },
            renderingDone: function () {
                Y && h.clearTimeout(Y)
            }
        };
        0 < b.timeout && (Y = h.setTimeout(Q.cleanupDOM, b.timeout));
        x("html2canvas: Preload starts: finding background-images");
        p.firstRun = !0;
        m(R);
        x("html2canvas: Preload: Finding images");
        for (R = 0; R < D; R += 1) Q.loadImage(S[R].getAttribute("src"));
        p.firstRun = !1;
        x("html2canvas: Preload: Done.");
        p.numTotal === p.numLoaded && e();
        return Q
    };
    l.Renderer = function (b, e) {
        var c = e.renderer;
        if ("string" === typeof e.renderer && l.Renderer[c] !== d) c = l.Renderer[c](e);
        else if ("function" === typeof c) c = c(e);
        else throw Error("Unknown renderer"); if ("function" !== typeof c) throw Error("Invalid renderer defined");
        var f = n,
            a = [],
            g = function (b) {
                var c = [],
                    d = [];
                b.children.forEach(function (b) {
                    b.children && 0 < b.children.length ? (c.push(b), d.push(b.zindex)) : a.push(b)
                });
                d.sort(function (a, b) {
                    return a - b
                });
                d.forEach(function (a) {
                    var b;
                    c.some(function (c, d) {
                        b = d;
                        return c.zindex === a
                    });
                    g(c.splice(b, 1)[0])
                })
            };
        g(b.zIndex);
        return c(b, e, f, a, l)
    };
    l.Util.Support = function (b, e) {
        function c() {
            var a = new Image,
                b = e.createElement("canvas"),
                c = b.getContext === d ? !1 : b.getContext("2d");
            if (!1 === c) return !1;
            b.width = b.height = 10;
            a.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><foreignObject width='10' height='10'><div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>sup</div></foreignObject></svg>";
            try {
                c.drawImage(a, 0, 0), b.toDataURL()
            } catch (g) {
                return !1
            }
            x("html2canvas: Parse: SVG powered rendering available");
            return !0
        }
        var f, a, g = !1;
        e.createRange && (f = e.createRange(), f.getBoundingClientRect && (a = e.createElement("boundtest"), a.style.height = "123px", a.style.display = "block", e.body.appendChild(a), f.selectNode(a), f = f.getBoundingClientRect(), f = f.height, 123 === f && (g = !0), e.body.removeChild(a)));
        return {
            rangeBounds: g,
            svgRendering: b.svgRendering && c()
        }
    };
    h.html2canvas = function (b, d) {
        b = b.length ? b : [b];
        var c, e, a = {
                logging: !1,
                elements: b,
                background: "#fff",
                proxy: null,
                timeout: 0,
                useCORS: !1,
                allowTaint: !1,
                svgRendering: !1,
                ignoreElements: "IFRAME|OBJECT|PARAM",
                useOverflow: !0,
                letterRendering: !1,
                chinese: !1,
                width: null,
                height: null,
                taintTest: !0,
                renderer: "Canvas"
            }, a = l.Util.Extend(d, a);
        l.logging = a.logging;
        a.complete = function (b) {
            if (!("function" === typeof a.onpreloaded && !1 === a.onpreloaded(b)) && (c = l.Parse(b, a), !("function" === typeof a.onparsed && !1 === a.onparsed(c)) && (e = l.Renderer(c, a), "function" === typeof a.onrendered))) a.onrendered(e)
        };
        h.setTimeout(function () {
            l.Preload(a)
        }, 0);
        return {
            render: function (b, c) {
                return l.Renderer(b, l.Util.Extend(c, a))
            },
            parse: function (b, c) {
                return l.Parse(b, l.Util.Extend(c, a))
            },
            preload: function (b) {
                return l.Preload(l.Util.Extend(b, a))
            },
            log: x
        }
    };
    h.html2canvas.log = x;
    h.html2canvas.Renderer = {
        Canvas: d
    };
    l.Renderer.Canvas = function (b) {
        function e(d, m) {
            switch (m.type) {
            case "variable":
                d[m.name] = m.arguments;
                break;
            case "function":
                if ("createPattern" === m.name) {
                    if (0 < m.arguments[0].width && 0 < m.arguments[0].height) try {
                        d.fillStyle = d.createPattern(m.arguments[0], "repeat")
                    } catch (h) {
                        x("html2canvas: Renderer: Error creating pattern", h.message)
                    }
                } else if ("drawShape" === m.name) {
                    var l = m.arguments;
                    d.beginPath();
                    l.forEach(function (a) {
                        d[a.name].apply(d, a.arguments)
                    });
                    d.closePath()
                } else if ("drawImage" === m.name) {
                    if (0 < m.arguments[8] && 0 < m.arguments[7]) {
                        if (!(l = !b.taintTest))
                            if (l = b.taintTest) a: {
                                if (-1 === f.indexOf(m.arguments[0].src)) {
                                    g.drawImage(m.arguments[0], 0, 0);
                                    try {
                                        g.getImageData(0, 0, 1, 1)
                                    } catch (t) {
                                        a = c.createElement("canvas");
                                        g = a.getContext("2d");
                                        l = !1;
                                        break a
                                    }
                                    f.push(m.arguments[0].src)
                                }
                                l = !0
                            }
                            l && d.drawImage.apply(d, m.arguments)
                    }
                } else d[m.name].apply(d, m.arguments)
            }
        }
        b = b || {};
        var c = n,
            f = [],
            a = n.createElement("canvas"),
            g = a.getContext("2d"),
            m = b.canvas || c.createElement("canvas");
        return function (a, b, c, g, f) {
            var l = m.getContext("2d"),
                h, t;
            m.width = m.style.width = b.width || a.ctx.width;
            m.height = m.style.height = b.height || a.ctx.height;
            h = l.fillStyle;
            l.fillStyle = ("transparent" === a.backgroundColor || "rgba(0, 0, 0, 0)" === a.backgroundColor) && b.background !== d ? b.background : a.backgroundColor;
            l.fillRect(0, 0, m.width, m.height);
            l.fillStyle = h;
            if (b.svgRendering && a.svgRender !== d) l.drawImage(a.svgRender, 0, 0);
            else {
                h = 0;
                for (t = g.length; h < t; h += 1) a = g.splice(0, 1)[0], a.canvasPosition = a.canvasPosition || {}, l.textBaseline = "bottom", a.clip && (l.save(), l.beginPath(), l.rect(a.clip.left, a.clip.top, a.clip.width, a.clip.height), l.clip()), a.ctx.storage && a.ctx.storage.forEach(e.bind(null, l)), a.clip && l.restore()
            }
            x("html2canvas: Renderer: Canvas renderer done - returning canvas obj");
            t = b.elements.length;
            return 1 === t && "object" === typeof b.elements[0] && "BODY" !== b.elements[0].nodeName ? (b = f.Util.Bounds(b.elements[0]), c = c.createElement("canvas"), c.width = b.width, c.height = b.height, l = c.getContext("2d"), l.drawImage(m, b.left, b.top, b.width, b.height, 0, 0, b.width, b.height), m = null, c) : m
        }
    }
})(window, document);
(function (h) {
    h.fn.html2canvas = function (n) {
        function d(b, d) {
            window.clearTimeout(l);
            l = window.setTimeout(function () {
                f.fadeOut(function () {
                    f.remove();
                    f = null
                })
            }, d || 2E3);
            f && f.remove();
            f = h("<div />").html(b).css({
                margin: 0,
                padding: 10,
                background: "#000",
                opacity: 0.7,
                position: "fixed",
                top: 10,
                right: 10,
                fontFamily: "Tahoma",
                color: "#fff",
                fontSize: 12,
                borderRadius: 12,
                width: "auto",
                height: "auto",
                textAlign: "center",
                textDecoration: "none",
                display: "none"
            }).appendTo(document.body).fadeIn();
            x.log(b)
        }
        n && (n.profile && window.console && window.console.profile) && console.profile();
        var x, f = null,
            l = !1,
            b = (new Date).getTime();
        n = n || {};
        n.onrendered = n.onrendered || function (e) {
            var f = h(e);
            e = new Date;
            n && (n.profile && window.console && window.console.profileEnd) && console.profileEnd();
            f.css({
                position: "absolute",
                left: 0,
                top: 0
            }).appendTo(document.body);
            f.siblings().toggle();
            h(window).click(function () {
                f.toggle().siblings().toggle();
                d("Canvas Render " + (f.is(":visible") ? "visible" : "hidden"))
            });
            d("Screenshot created in " + (e.getTime() - b) + " ms<br />", 4E3);
            try {
                f[0].toDataURL()
            } catch (l) {
                "canvas" === f[0].nodeName.toLowerCase() && alert("Canvas is tainted, unable to read data")
            }
        };
        x = html2canvas(this, n)
    }
})(jQuery);
(function (h, n) {
    function d(a, b, c) {
        for (var d = [], e = 0; e < a.length; e++) {
            var g = tinycolor(a[e]),
                f = 0.5 > g.toHsl().l ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light",
                f = f + (tinycolor.equals(b, a[e]) ? " sp-thumb-active" : ""),
                m = I ? "background-color:" + g.toRgbString() : "filter:" + g.toFilter();
            d.push('<span title="' + g.toHexString() + '" data-color="' + g.toRgbString() + '" class="' + f + '"><span class="sp-thumb-inner" style="' + m + ';" /></span>')
        }
        return "<div class='sp-cf " + c + "'>" + d.join("") + "</div>"
    }

    function x(a, b) {
        var c = a.outerWidth(),
            d = a.outerHeight(),
            e = b.outerHeight(),
            g = a[0].ownerDocument,
            f = g.documentElement,
            m = f.clientWidth + n(g).scrollLeft(),
            g = f.clientHeight + n(g).scrollTop(),
            f = b.offset();
        f.top += e;
        f.left -= Math.min(f.left, f.left + c > m && m > c ? Math.abs(f.left + c - m) : 0);
        f.top -= Math.min(f.top, f.top + d > g && g > d ? Math.abs(d + e - 0) : 0);
        return f
    }

    function f() {}

    function l(a) {
        a.stopPropagation()
    }

    function b(a, b) {
        var c = Array.prototype.slice,
            d = c.call(arguments, 2);
        return function () {
            return a.apply(b, d.concat(c.call(arguments)))
        }
    }

    function e(a, b, c, d) {
        function e(a) {
            a.stopPropagation && a.stopPropagation();
            a.preventDefault && a.preventDefault();
            a.returnValue = !1
        }

        function g(c) {
            if (l) {
                if (y && 9 > document.documentMode && !c.button) return f();
                var d = c.originalEvent.touches,
                    m = d ? d[0].pageY : c.pageY,
                    d = Math.max(0, Math.min((d ? d[0].pageX : c.pageX) - p.left, q)),
                    m = Math.max(0, Math.min(m - p.top, t));
                s && e(c);
                b.apply(a, [d, m, c])
            }
        }

        function f() {
            l && (n(m).unbind(G), n(m.body).removeClass("sp-dragging"), d.apply(a, arguments));
            l = !1
        }
        b = b || function () {};
        c = c || function () {};
        d = d || function () {};
        var m = a.ownerDocument || document,
            l = !1,
            p = {}, t = 0,
            q = 0,
            s = "ontouchstart" in h,
            G = {};
        G.selectstart = e;
        G.dragstart = e;
        G[s ? "touchmove" : "mousemove"] = g;
        G[s ? "touchend" : "mouseup"] = f;
        n(a).bind(s ? "touchstart" : "mousedown", function (b) {
            if (!(b.which ? 3 == b.which : 2 == b.button) && !l && !1 !== c.apply(a, arguments)) l = !0, t = n(a).height(), q = n(a).width(), p = n(a).offset(), n(m).bind(G), n(m.body).addClass("sp-dragging"), s || g(b), e(b)
        })
    }
    var m = {
        beforeShow: f,
        move: f,
        change: f,
        show: f,
        hide: f,
        color: !1,
        flat: !1,
        showInput: !1,
        showButtons: !0,
        clickoutFiresChange: !1,
        showInitial: !1,
        showPalette: !1,
        showPaletteOnly: !1,
        showSelectionPalette: !0,
        localStorageKey: !1,
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        preferredFormat: !1,
        className: "",
        showAlpha: !1,
        theme: "sp-light",
        palette: ["fff", "000"],
        selectionPalette: []
    }, t = [],
        y = !! /msie/i.exec(h.navigator.userAgent),
        I, c = document.createElement("div").style;
    c.cssText = "background-color:rgba(0,0,0,.5)";
    I = !! ~("" + c.backgroundColor).indexOf("rgba") || !! ~("" + c.backgroundColor).indexOf("hsla");
    var ha, c = "";
    if (y)
        for (var a = 1; 6 >= a; a++) c += "<div class='sp-" + a + "'></div>";
    ha = ["<div class='sp-container'><div class='sp-palette-container'><div class='sp-palette sp-thumb sp-cf'></div></div><div class='sp-picker-container'><div class='sp-top sp-cf'><div class='sp-fill'></div><div class='sp-top-inner'><div class='sp-color'><div class='sp-sat'><div class='sp-val'><div class='sp-dragger'></div></div></div></div><div class='sp-hue'><div class='sp-slider'></div>", c, "</div></div><div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div></div><div class='sp-input-container sp-cf'><input class='sp-input' type='text' spellcheck='false' /></div><div class='sp-initial sp-thumb sp-cf'></div><div class='sp-button-container sp-cf'><a class='sp-cancel' href='#'></a><button class='sp-choose'></button></div></div></div>"].join("");
    n.fn.spectrum = function (a, c) {
        return "string" == typeof a ? "get" == a ? t[this.eq(0).data("spectrum.id")].get() : "container" == a ? t[n(this).data("spectrum.id")].container : this.each(function () {
            var b = t[n(this).data("spectrum.id")];
            b && ("show" == a && b.show(), "hide" == a && b.hide(), "toggle" == a && b.toggle(), "reflow" == a && b.reflow(), "set" == a && b.set(c), "destroy" == a && (b.destroy(), n(this).removeData("spectrum.id")))
        }) : this.spectrum("destroy").each(function () {
            var c, g = function (a) {
                    V && (ka.push(tinycolor(a).toHexString()), T && h.localStorage && (h.localStorage[T] = ka.join(",")))
                }, f = function () {
                    var a = [],
                        b = ka,
                        c = {}, d;
                    if (J) {
                        for (var e = 0; e < ya.length; e++)
                            for (var g = 0; g < ya[e].length; g++) d = tinycolor(ya[e][g]).toHexString(), c[d] = !0;
                        for (e = 0; e < b.length; e++) d = tinycolor(b[e]).toHexString(), c.hasOwnProperty(d) || (a.push(b[e]), c[d] = !0)
                    }
                    return a.reverse().slice(0, j.maxSelectionSize)
                }, w = function () {
                    var a = G(),
                        b = n.map(ya, function (b, c) {
                            return d(b, a, "sp-palette-row sp-palette-row-" + c)
                        });
                    ka && b.push(d(f(), a, "sp-palette-row sp-palette-row-selection"));
                    Ma.html(b.join(""))
                }, p = function () {
                    if (O) {
                        var a = qa,
                            b = G();
                        Na.html(d([a, b], b, "sp-palette-row-initial"))
                    }
                };
            c = function () {
                (0 === na || 0 === ca || 0 === va) && F();
                M.addClass(ga)
            };
            var q = function () {
                M.removeClass(ga)
            }, s = function () {
                    var a = tinycolor(ma.val());
                    a.ok ? D(a) : ma.addClass("sp-validation-error")
                }, L = function () {
                    X ? A() : ea()
                }, ea = function () {
                    if (X) F();
                    else if (!1 !== U.beforeShow(G())) {
                        for (var a = 0; a < t.length; a++) t[a] && t[a].hide();
                        X = !0;
                        n(pa).bind("click.spectrum", A);
                        n(h).bind("resize.spectrum", Y);
                        ra.addClass("sp-active");
                        M.show();
                        J && w();
                        F();
                        W();
                        qa = G();
                        p();
                        U.show(qa)
                    }
                }, A = function (a) {
                    if ((!a || !("click" == a.type && 2 == a.button)) && X && !C) X = !1, n(pa).unbind("click.spectrum", A), n(h).unbind("resize.spectrum", Y), ra.removeClass("sp-active"), M.hide(), tinycolor.equals(G(), qa) || (Ua && "cancel" !== a ? r(!0) : D(qa, !0)), U.hide(G())
                }, D = function (a, b) {
                    if (!tinycolor.equals(a, G())) {
                        var c = tinycolor(a),
                            d = c.toHsv();
                        P = d.h;
                        wa = d.s;
                        xa = d.v;
                        la = d.a;
                        W();
                        b || (za = Da || c.format)
                    }
                }, G = function () {
                    return tinycolor.fromRatio({
                        h: P,
                        s: wa,
                        v: xa,
                        a: Math.round(100 * la) / 100
                    })
                }, E = function () {
                    W();
                    U.move(G())
                }, W = function () {
                    ma.removeClass("sp-validation-error");
                    H();
                    var a = tinycolor({
                        h: P,
                        s: "1.0",
                        v: "1.0"
                    });
                    ua.css("background-color", a.toHexString());
                    a = za;
                    if (1 > la && ("hex" === a || "name" === a)) a = "rgb";
                    var b = G(),
                        c = b.toHexString(),
                        d = b.toRgbString();
                    I || 1 === b.alpha ? Ea.css("background-color", d) : (Ea.css("background-color", "transparent"), Ea.css("filter", b.toFilter()));
                    if (R) {
                        d = b.toRgb();
                        d.a = 0;
                        var d = tinycolor(d).toRgbString(),
                            e = "linear-gradient(left, " + d + ", " + c + ")";
                        y ? ta.css("filter", tinycolor(d).toFilter({
                            gradientType: 1
                        }, c)) : (ta.css("background", "-webkit-" + e), ta.css("background", "-moz-" + e), ta.css("background", "-ms-" + e), ta.css("background", e))
                    }
                    if (Q) {
                        if (1 > la && ("hex" === a || "name" === a)) a = "rgb";
                        ma.val(b.toString(a))
                    }
                    J && w();
                    p()
                }, H = function () {
                    var a = wa * ca,
                        b = na - xa * na,
                        a = Math.max(-oa, Math.min(ca - oa, a - oa)),
                        b = Math.max(-oa, Math.min(na - oa, b - oa));
                    Oa.css({
                        top: b,
                        left: a
                    });
                    Pa.css({
                        left: la * Ca - Ka / 2
                    });
                    Qa.css({
                        top: P * va - La
                    })
                }, r = function (a) {
                    var b = G();
                    Fa && aa.val(b.toString(za)).change();
                    var c = !tinycolor.equals(b, qa);
                    qa = b;
                    g(b);
                    a && c && U.change(b)
                }, F = function () {
                    ca = ua.width();
                    na = ua.height();
                    oa = Oa.height();
                    Ga.width();
                    va = Ga.height();
                    La = Qa.height();
                    Ca = Ra.width();
                    Ka = Pa.width();
                    C || M.offset(x(M, Ha));
                    H()
                }, j, u = n.extend({}, m, a);
            u.callbacks = {
                move: b(u.move, this),
                change: b(u.change, this),
                show: b(u.show, this),
                hide: b(u.hide, this),
                beforeShow: b(u.beforeShow, this)
            };
            j = u;
            var C = j.flat,
                u = j.showPaletteOnly,
                J = j.showPalette || u,
                O = j.showInitial && !C,
                Q = j.showInput,
                R = j.showAlpha,
                V = j.showSelectionPalette,
                T = j.localStorageKey,
                S = j.theme,
                U = j.callbacks,
                Y, Z = F,
                v;
            Y = function () {
                var a = this,
                    b = arguments;
                v || (v = setTimeout(function () {
                    v = null;
                    Z.apply(a, b)
                }, 10))
            };
            var X = !1,
                ca = 0,
                na = 0,
                oa = 0,
                va = 0,
                Ca = 0,
                Ka = 0,
                La = 0,
                P = 0,
                wa = 0,
                xa = 0,
                la = 1,
                B = j.palette.slice(0),
                ya = n.isArray(B[0]) ? B : [B],
                ka = j.selectionPalette.slice(0),
                ga = "sp-dragging",
                pa = this.ownerDocument,
                B = pa.body,
                aa = n(this),
                M = n(ha, pa).addClass(S),
                ua = M.find(".sp-color"),
                Oa = M.find(".sp-dragger"),
                Ga = M.find(".sp-hue"),
                Qa = M.find(".sp-slider"),
                ta = M.find(".sp-alpha-inner"),
                Ra = M.find(".sp-alpha"),
                Pa = M.find(".sp-alpha-handle"),
                ma = M.find(".sp-input"),
                Ma = M.find(".sp-palette"),
                Na = M.find(".sp-initial"),
                Sa = M.find(".sp-cancel"),
                Ta = M.find(".sp-choose"),
                Fa = aa.is("input"),
                Ia = Fa && !C,
                ra = Ia ? n("<div class='sp-replacer'><div class='sp-preview'><div class='sp-preview-inner'></div></div><div class='sp-dd'>&#9660;</div></div>").addClass(S) : n([]),
                Ha = Ia ? ra : aa,
                Ea = ra.find(".sp-preview-inner"),
                Aa = j.color || Fa && aa.val(),
                qa = !1,
                Da = j.preferredFormat,
                za = Da,
                Ua = !j.showButtons || j.clickoutFiresChange;
            Ta.text(j.chooseText);
            Sa.text(j.cancelText);
            S = function (a) {
                a.data && a.data.ignore ? (D(n(this).data("color")), E()) : (D(n(this).data("color")), r(!0), E(), A());
                return !1
            };
            y && M.find("*:not(input)").attr("unselectable", "on");
            M.toggleClass("sp-flat", C);
            M.toggleClass("sp-input-disabled", !Q);
            M.toggleClass("sp-alpha-enabled", R);
            M.toggleClass("sp-buttons-disabled", !j.showButtons || C);
            M.toggleClass("sp-palette-disabled", !J);
            M.toggleClass("sp-palette-only", u);
            M.toggleClass("sp-initial-disabled", !O);
            M.addClass(j.className);
            Ia && aa.hide().after(ra);
            C ? aa.after(M).hide() : n(B).append(M.hide());
            if (T && h.localStorage) try {
                ka = h.localStorage[T].split(",")
            } catch (Va) {}
            Ha.bind("click.spectrum touchstart.spectrum", function (a) {
                L();
                a.stopPropagation();
                n(a.target).is("input") || a.preventDefault()
            });
            M.click(l);
            ma.change(s);
            ma.bind("paste", function () {
                setTimeout(s, 1)
            });
            ma.keydown(function (a) {
                13 == a.keyCode && s()
            });
            Sa.bind("click.spectrum", function (a) {
                a.stopPropagation();
                a.preventDefault();
                A("cancel")
            });
            Ta.bind("click.spectrum", function (a) {
                a.stopPropagation();
                a.preventDefault();
                ma.hasClass("sp-validation-error") || (r(!0), A())
            });
            e(Ra, function (a, b, c) {
                la = a / Ca;
                c.shiftKey && (la = Math.round(10 * la) / 10);
                E()
            });
            e(Ga, function (a, b) {
                P = b / va;
                E()
            }, c, q);
            e(ua, function (a, b) {
                wa = a / ca;
                xa = (na - b) / na;
                E()
            }, c, q);
            Aa ? (D(Aa), W(), za = Da || tinycolor(Aa).format, g(Aa)) : W();
            C && ea();
            c = y ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            Ma.delegate(".sp-thumb-el", c, S);
            Na.delegate(".sp-thumb-el::nth-child(1)", c, {
                ignore: !0
            }, S);
            var Ba = {
                show: ea,
                hide: A,
                toggle: L,
                reflow: F,
                set: function (a) {
                    D(a);
                    r()
                },
                get: G,
                destroy: function () {
                    aa.show();
                    Ha.unbind("click.spectrum touchstart.spectrum");
                    M.remove();
                    ra.remove();
                    t[Ba.id] = null
                },
                container: M
            };
            Ba.id = t.push(Ba) - 1;
            c = Ba;
            n(this).data("spectrum.id", c.id)
        })
    };
    n.fn.spectrum.load = !0;
    n.fn.spectrum.loadOpts = {};
    n.fn.spectrum.draggable = e;
    n.fn.spectrum.defaults = m;
    n.fn.spectrum.processNativeColorInputs = function () {
        var a = n("<input type='color' value='!' />")[0];
        "color" === a.type && "!" != a.value || n("input[type=color]").spectrum({
            preferredFormat: "hex6"
        })
    };
    var g = function (a) {
        var b, c, d, e, f;
        if ("object" == typeof a && a.hasOwnProperty("_tc_id")) return a;
        c = a;
        var m = 0,
            l = 0,
            h = 0;
        a = 1;
        var t = !1,
            n = !1;
        if ("string" == typeof c) a: {
            c = c.replace(R, "").replace(T, "").toLowerCase();
            var y = !1;
            if (q[c]) c = q[c], y = !0;
            else if ("transparent" == c) {
                c = {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                };
                break a
            }
            c = (b = Z.rgb.exec(c)) ? {
                r: b[1],
                g: b[2],
                b: b[3]
            } : (b = Z.rgba.exec(c)) ? {
                r: b[1],
                g: b[2],
                b: b[3],
                a: b[4]
            } : (b = Z.hsl.exec(c)) ? {
                h: b[1],
                s: b[2],
                l: b[3]
            } : (b = Z.hsla.exec(c)) ? {
                h: b[1],
                s: b[2],
                l: b[3],
                a: b[4]
            } : (b = Z.hsv.exec(c)) ? {
                h: b[1],
                s: b[2],
                v: b[3]
            } : (b = Z.hex6.exec(c)) ? {
                r: parseInt(b[1], 16),
                g: parseInt(b[2], 16),
                b: parseInt(b[3], 16),
                format: y ? "name" : "hex"
            } : (b = Z.hex3.exec(c)) ? {
                r: parseInt(b[1] + "" + b[1], 16),
                g: parseInt(b[2] + "" + b[2], 16),
                b: parseInt(b[3] + "" + b[3], 16),
                format: y ? "name" : "hex"
            } : !1
        }
        "object" == typeof c && (c.hasOwnProperty("r") && c.hasOwnProperty("g") && c.hasOwnProperty("b") ? (m = 255 * J(c.r, 255), l = 255 * J(c.g, 255), h = 255 * J(c.b, 255), t = !0, n = "rgb") : c.hasOwnProperty("h") && c.hasOwnProperty("s") && c.hasOwnProperty("v") ? (n = c.h, l = c.s, h = c.v, n = 6 * J(n, 360), l = J(l, 100), h = J(h, 100), m = S.floor(n), t = n - m, n = h * (1 - l), b = h * (1 - t * l), t = h * (1 - (1 - t) * l), y = m % 6, m = 255 * [h, b, n, n, t, h][y], l = 255 * [t, h, h, b, n, n][y], h = 255 * [n, n, t, h, h, b][y], t = !0, n = "hsv") : c.hasOwnProperty("h") && (c.hasOwnProperty("s") && c.hasOwnProperty("l")) && (m = c.h, n = c.s, h = c.l, l = function (a, b, c) {
            0 > c && (c += 1);
            1 < c && (c -= 1);
            return c < 1 / 6 ? a + 6 * (b - a) * c : 0.5 > c ? b : c < 2 / 3 ? a + 6 * (b - a) * (2 / 3 - c) : a
        }, m = J(m, 360), n = J(n, 100), h = J(h, 100), 0 === n ? n = h = b = h : (b = 0.5 > h ? h * (1 + n) : h + n - h * n, t = 2 * h - b, n = l(t, b, m + 1 / 3), h = l(t, b, m), b = l(t, b, m - 1 / 3)), m = 255 * n, l = 255 * h, h = 255 * b, t = !0, n = "hsl"), c.hasOwnProperty("a") && (a = c.a));
        m = C(255, A(m, 0));
        l = C(255, A(l, 0));
        h = C(255, A(h, 0));
        1 > m && (m = D(m));
        1 > l && (l = D(l));
        1 > h && (h = D(h));
        b = t;
        c = c && c.format || n;
        d = m;
        e = l;
        f = h;
        var x = s(a);
        return {
            ok: b,
            format: c,
            _tc_id: U++,
            alpha: x,
            toHsv: function () {
                var a = ca(d, e, f);
                return {
                    h: a.h,
                    s: a.s,
                    v: a.v,
                    a: x
                }
            },
            toHsvString: function () {
                var a = ca(d, e, f),
                    b = D(360 * a.h),
                    c = D(100 * a.s),
                    a = D(100 * a.v);
                return 1 == x ? "hsv(" + b + ", " + c + "%, " + a + "%)" : "hsva(" + b + ", " + c + "%, " + a + "%, " + x + ")"
            },
            toHsl: function () {
                var a = X(d, e, f);
                return {
                    h: a.h,
                    s: a.s,
                    l: a.l,
                    a: x
                }
            },
            toHslString: function () {
                var a = X(d, e, f),
                    b = D(360 * a.h),
                    c = D(100 * a.s),
                    a = D(100 * a.l);
                return 1 == x ? "hsl(" + b + ", " + c + "%, " + a + "%)" : "hsla(" + b + ", " + c + "%, " + a + "%, " + x + ")"
            },
            toHex: function () {
                return p(d, e, f)
            },
            toHexString: function (a) {
                return "#" + p(d, e, f, a)
            },
            toRgb: function () {
                return {
                    r: D(d),
                    g: D(e),
                    b: D(f),
                    a: x
                }
            },
            toRgbString: function () {
                return 1 == x ? "rgb(" + D(d) + ", " + D(e) + ", " + D(f) + ")" : "rgba(" + D(d) + ", " + D(e) + ", " + D(f) + ", " + x + ")"
            },
            toName: function () {
                return O[p(d, e, f)] || !1
            },
            toFilter: function (a, b) {
                var c = p(d, e, f, !0),
                    m = c,
                    l = Math.round(255 * s(x)).toString(16),
                    h = l,
                    j = a && a.gradientType ? "GradientType = 1, " : "";
                b && (h = g(b), m = h.toHex(), h = Math.round(255 * s(h.alpha)).toString(16));
                return "progid:DXImageTransform.Microsoft.gradient(" + j + "startColorstr=#" + Q(l) + c + ",endColorstr=#" + Q(h) + m + ")"
            },
            toString: function (a) {
                a = a || this.format;
                var b = !1;
                "rgb" === a && (b = this.toRgbString());
                "hex" === a && (b = this.toHexString());
                "hex6" === a && (b = this.toHexString(!0));
                "name" === a && (b = this.toName());
                "hsl" === a && (b = this.toHslString());
                "hsv" === a && (b = this.toHsvString());
                return b || this.toHexString(!0)
            }
        }
    }, X = function (a, b, c) {
            a = J(a, 255);
            b = J(b, 255);
            c = J(c, 255);
            var d = A(a, b, c),
                e = C(a, b, c),
                g, f = (d + e) / 2;
            if (d == e) g = e = 0;
            else {
                var m = d - e,
                    e = 0.5 < f ? m / (2 - d - e) : m / (d + e);
                switch (d) {
                case a:
                    g = (b - c) / m + (b < c ? 6 : 0);
                    break;
                case b:
                    g = (c - a) / m + 2;
                    break;
                case c:
                    g = (a - b) / m + 4
                }
                g /= 6
            }
            return {
                h: g,
                s: e,
                l: f
            }
        }, ca = function (a, b, c) {
            a = J(a, 255);
            b = J(b, 255);
            c = J(c, 255);
            var d = A(a, b, c),
                e = C(a, b, c),
                g, f = d - e;
            if (d == e) g = 0;
            else {
                switch (d) {
                case a:
                    g = (b - c) / f + (b < c ? 6 : 0);
                    break;
                case b:
                    g = (c - a) / f + 2;
                    break;
                case c:
                    g = (a - b) / f + 4
                }
                g /= 6
            }
            return {
                h: g,
                s: 0 === d ? 0 : f / d,
                v: d
            }
        }, p = function (a, b, c, d) {
            a = [Q(D(a).toString(16)), Q(D(b).toString(16)), Q(D(c).toString(16))];
            return !d && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("")
        }, J = function (a, b) {
            "string" == typeof a && (-1 != a.indexOf(".") && 1 === s(a)) && (a = "100%");
            var c = "string" === typeof a && -1 != a.indexOf("%");
            a = C(b, A(0, s(a)));
            c && (a *= b / 100);
            return 1E-6 > S.abs(a - b) ? 1 : 1 <= a ? a % b / s(b) : a
        }, Q = function (a) {
            return 1 == a.length ? "0" + a : "" + a
        }, R = /^[\s,#]+/,
        T = /\s+$/,
        U = 0,
        S = Math,
        D = S.round,
        C = S.min,
        A = S.max,
        Y = S.random,
        s = this.parseFloat;
    g.fromRatio = function (a) {
        if ("object" == typeof a)
            for (var b in a) 1 === a[b] && (a[b] = "1.0");
        return g(a)
    };
    g.equals = function (a, b) {
        return !a || !b ? !1 : g(a).toRgbString() == g(b).toRgbString()
    };
    g.random = function () {
        return g.fromRatio({
            r: Y(),
            g: Y(),
            b: Y()
        })
    };
    g.desaturate = function (a, b) {
        var c = g(a).toHsl();
        c.s -= (b || 10) / 100;
        c.s = C(1, A(0, c.s));
        return g(c)
    };
    g.saturate = function (a, b) {
        var c = g(a).toHsl();
        c.s += (b || 10) / 100;
        c.s = C(1, A(0, c.s));
        return g(c)
    };
    g.greyscale = function (a) {
        return g.desaturate(a, 100)
    };
    g.lighten = function (a, b) {
        var c = g(a).toHsl();
        c.l += (b || 10) / 100;
        c.l = C(1, A(0, c.l));
        return g(c)
    };
    g.darken = function (a, b) {
        var c = g(a).toHsl();
        c.l -= (b || 10) / 100;
        c.l = C(1, A(0, c.l));
        return g(c)
    };
    g.complement = function (a) {
        a = g(a).toHsl();
        a.h = (a.h + 0.5) % 1;
        return g(a)
    };
    g.triad = function (a) {
        var b = g(a).toHsl(),
            c = 360 * b.h;
        return [g(a), g({
            h: (c + 120) % 360,
            s: b.s,
            l: b.l
        }), g({
            h: (c + 240) % 360,
            s: b.s,
            l: b.l
        })]
    };
    g.tetrad = function (a) {
        var b = g(a).toHsl(),
            c = 360 * b.h;
        return [g(a), g({
            h: (c + 90) % 360,
            s: b.s,
            l: b.l
        }), g({
            h: (c + 180) % 360,
            s: b.s,
            l: b.l
        }), g({
            h: (c + 270) % 360,
            s: b.s,
            l: b.l
        })]
    };
    g.splitcomplement = function (a) {
        var b = g(a).toHsl(),
            c = 360 * b.h;
        return [g(a), g({
            h: (c + 72) % 360,
            s: b.s,
            l: b.l
        }), g({
            h: (c + 216) % 360,
            s: b.s,
            l: b.l
        })]
    };
    g.analogous = function (a, b, c) {
        b = b || 6;
        c = c || 30;
        var d = g(a).toHsl();
        c = 360 / c;
        a = [g(a)];
        d.h *= 360;
        for (d.h = (d.h - (c * b >> 1) + 720) % 360; --b;) d.h = (d.h + c) % 360, a.push(g(d));
        return a
    };
    g.monochromatic = function (a, b) {
        b = b || 6;
        for (var c = g(a).toHsv(), d = c.h, e = c.s, c = c.v, f = [], m = 1 / b; b--;) f.push(g({
            h: d,
            s: e,
            v: c
        })), c = (c + m) % 1;
        return f
    };
    g.readable = function (a, b) {
        var c = g(a).toRgb(),
            d = g(b).toRgb();
        return 10404 < (d.r - c.r) * (d.r - c.r) + (d.g - c.g) * (d.g - c.g) + (d.b - c.b) * (d.b - c.b)
    };
    var q = g.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    }, c = g,
        a = q,
        F = {}, V;
    for (V in a) a.hasOwnProperty(V) && (F[a[V]] = V);
    var O = c.hexNames = F,
        Z;
    Z = {
        rgb: RegExp("rgb[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
        rgba: RegExp("rgba[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
        hsl: RegExp("hsl[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
        hsla: RegExp("hsla[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
        hsv: RegExp("hsv[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
        hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
    this.tinycolor = g;
    n(function () {
        n.fn.spectrum.load && n.fn.spectrum.processNativeColorInputs()
    })
})(window, jQuery);
(function (h, n) {
    var d = function (b, e) {
        return new d.Instance(b, e || {})
    };
    d.defaults = {
        stop_browser_behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    d.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;
    d.HAS_TOUCHEVENTS = "ontouchstart" in h;
    d.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
    d.NO_MOUSEEVENTS = d.HAS_TOUCHEVENTS && navigator.userAgent.match(d.MOBILE_REGEX);
    d.EVENT_TYPES = {};
    d.DIRECTION_DOWN = "down";
    d.DIRECTION_LEFT = "left";
    d.DIRECTION_UP = "up";
    d.DIRECTION_RIGHT = "right";
    d.POINTER_MOUSE = "mouse";
    d.POINTER_TOUCH = "touch";
    d.POINTER_PEN = "pen";
    d.EVENT_START = "start";
    d.EVENT_MOVE = "move";
    d.EVENT_END = "end";
    d.DOCUMENT = document;
    d.plugins = {};
    d.READY = !1;
    d.Instance = function (b, e) {
        var f = this;
        if (!d.READY) {
            d.event.determineEventTypes();
            for (var h in d.gestures) d.gestures.hasOwnProperty(h) && d.detection.register(d.gestures[h]);
            d.event.onTouch(d.DOCUMENT, d.EVENT_MOVE, d.detection.detect);
            d.event.onTouch(d.DOCUMENT, d.EVENT_END, d.detection.detect);
            d.READY = !0
        }
        this.element = b;
        this.enabled = !0;
        this.options = d.utils.extend(d.utils.extend({}, d.defaults), e || {});
        this.options.stop_browser_behavior && d.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior);
        d.event.onTouch(b, d.EVENT_START, function (b) {
            f.enabled && d.detection.startDetect(f, b)
        });
        return this
    };
    d.Instance.prototype = {
        on: function (b, d) {
            for (var f = b.split(" "), h = 0; h < f.length; h++) this.element.addEventListener(f[h], d, !1);
            return this
        },
        off: function (b, d) {

            for (var f = b.split(" "), h = 0; h < f.length; h++) this.element.removeEventListener(f[h], d, !1);
            return this
        },
        trigger: function (b, e) {
            var f = d.DOCUMENT.createEvent("Event");
            f.initEvent(b, !0, !0);
            f.gesture = e;
            var h = this.element;
            d.utils.hasParent(e.target, h) && (h = e.target);
            h.dispatchEvent(f);
            return this
        },
        enable: function (b) {
            this.enabled = b;
            return this
        }
    };
    var x = null,
        f = !1,
        l = !1;
    d.event = {
        bindDom: function (b, d, f) {
            d = d.split(" ");
            for (var h = 0; h < d.length; h++) b.addEventListener(d[h], f, !1)
        },
        onTouch: function (b, e, m) {
            var h = this;
            this.bindDom(b, d.EVENT_TYPES[e], function (n) {
                var I = n.type.toLowerCase();
                if (!I.match(/mouse/) || !l) {
                    if (I.match(/touch/) || I.match(/pointerdown/) || I.match(/mouse/) && 1 === n.which) f = !0;
                    I.match(/touch|pointer/) && (l = !0);
                    var c = 0;
                    f && (d.HAS_POINTEREVENTS && e != d.EVENT_END ? c = d.PointerEvent.updatePointer(e, n) : I.match(/touch/) ? c = n.touches.length : l || (c = I.match(/up/) ? 0 : 1), 0 < c && e == d.EVENT_END ? e = d.EVENT_MOVE : c || (e = d.EVENT_END), !c && null !== x ? n = x : x = n, m.call(d.detection, h.collectEventData(b, e, n)), d.HAS_POINTEREVENTS && e == d.EVENT_END && (c = d.PointerEvent.updatePointer(e, n)));
                    c || (x = null, l = f = !1, d.PointerEvent.reset())
                }
            })
        },
        determineEventTypes: function () {
            var b;
            b = d.HAS_POINTEREVENTS ? d.PointerEvent.getEvents() : d.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"];
            d.EVENT_TYPES[d.EVENT_START] = b[0];
            d.EVENT_TYPES[d.EVENT_MOVE] = b[1];
            d.EVENT_TYPES[d.EVENT_END] = b[2]
        },
        getTouchList: function (b) {
            return d.HAS_POINTEREVENTS ? d.PointerEvent.getTouchList() : b.touches ? b.touches : [{
                identifier: 1,
                pageX: b.pageX,
                pageY: b.pageY,
                target: b.target
            }]
        },
        collectEventData: function (b, e, f) {
            b = this.getTouchList(f, e);
            var h = d.POINTER_TOUCH;
            if (f.type.match(/mouse/) || d.PointerEvent.matchType(d.POINTER_MOUSE, f)) h = d.POINTER_MOUSE;
            return {
                center: d.utils.getCenter(b),
                timeStamp: (new Date).getTime(),
                target: f.target,
                touches: b,
                eventType: e,
                pointerType: h,
                srcEvent: f,
                preventDefault: function () {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation();
                    this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                },
                stopPropagation: function () {
                    this.srcEvent.stopPropagation()
                },
                stopDetect: function () {
                    return d.detection.stopDetect()
                }
            }
        }
    };
    d.PointerEvent = {
        pointers: {},
        getTouchList: function () {
            var b = this,
                d = [];
            Object.keys(b.pointers).sort().forEach(function (f) {
                d.push(b.pointers[f])
            });
            return d
        },
        updatePointer: function (b, e) {
            b == d.EVENT_END ? this.pointers = {} : (e.identifier = e.pointerId, this.pointers[e.pointerId] = e);
            return Object.keys(this.pointers).length
        },
        matchType: function (b, e) {
            if (!e.pointerType) return !1;
            var f = {};
            f[d.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == d.POINTER_MOUSE;
            f[d.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == d.POINTER_TOUCH;
            f[d.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == d.POINTER_PEN;
            return f[b]
        },
        getEvents: function () {
            return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        },
        reset: function () {
            this.pointers = {}
        }
    };
    d.utils = {
        extend: function (b, d, f) {
            for (var h in d) b[h] !== n && f || (b[h] = d[h]);
            return b
        },
        hasParent: function (b, d) {
            for (; b;) {
                if (b == d) return !0;
                b = b.parentNode
            }
            return !1
        },
        getCenter: function (b) {
            for (var d = [], f = [], h = 0, l = b.length; h < l; h++) d.push(b[h].pageX), f.push(b[h].pageY);
            return {
                pageX: (Math.min.apply(Math, d) + Math.max.apply(Math, d)) / 2,
                pageY: (Math.min.apply(Math, f) + Math.max.apply(Math, f)) / 2
            }
        },
        getVelocity: function (b, d, f) {
            return {
                x: Math.abs(d / b) || 0,
                y: Math.abs(f / b) || 0
            }
        },
        getAngle: function (b, d) {
            return 180 * Math.atan2(d.pageY - b.pageY, d.pageX - b.pageX) / Math.PI
        },
        getDirection: function (b, e) {
            var f = Math.abs(b.pageX - e.pageX),
                h = Math.abs(b.pageY - e.pageY);
            return f >= h ? 0 < b.pageX - e.pageX ? d.DIRECTION_LEFT : d.DIRECTION_RIGHT : 0 < b.pageY - e.pageY ? d.DIRECTION_UP : d.DIRECTION_DOWN
        },
        getDistance: function (b, d) {
            var f = d.pageX - b.pageX,
                h = d.pageY - b.pageY;
            return Math.sqrt(f * f + h * h)
        },
        getScale: function (b, d) {
            return 2 <= b.length && 2 <= d.length ? this.getDistance(d[0], d[1]) / this.getDistance(b[0], b[1]) : 1
        },
        getRotation: function (b, d) {
            return 2 <= b.length && 2 <= d.length ? this.getAngle(d[1], d[0]) - this.getAngle(b[1], b[0]) : 0
        },
        isVertical: function (b) {
            return b == d.DIRECTION_UP || b == d.DIRECTION_DOWN
        },
        stopDefaultBrowserBehavior: function (b, d) {
            var f, h = "webkit khtml moz ms o ".split(" ");
            if (d && b.style) {
                for (var l = 0; l < h.length; l++)
                    for (var n in d) d.hasOwnProperty(n) && (f = n, h[l] && (f = h[l] + f.substring(0, 1).toUpperCase() + f.substring(1)), b.style[f] = d[n]);
                "none" == d.userSelect && (b.onselectstart = function () {
                    return !1
                })
            }
        }
    };
    d.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function (b, e) {
            this.current || (this.stopped = !1, this.current = {
                inst: b,
                startEvent: d.utils.extend({}, e),
                lastEvent: !1,
                name: ""
            }, this.detect(e))
        },
        detect: function (b) {
            if (this.current && !this.stopped) {
                b = this.extendEventData(b);
                for (var e = this.current.inst.options, f = 0, h = this.gestures.length; f < h; f++) {
                    var l = this.gestures[f];
                    if (!this.stopped && !1 !== e[l.name] && !1 === l.handler.call(l, b, this.current.inst)) {
                        this.stopDetect();
                        break
                    }
                }
                this.current && (this.current.lastEvent = b);
                b.eventType == d.EVENT_END && !b.touches.length - 1 && this.stopDetect();
                return b
            }
        },
        stopDetect: function () {
            this.previous = d.utils.extend({}, this.current);
            this.current = null;
            this.stopped = !0
        },
        extendEventData: function (b) {
            var e = this.current.startEvent;
            if (e && (b.touches.length != e.touches.length || b.touches === e.touches)) {
                e.touches = [];
                for (var f = 0, h = b.touches.length; f < h; f++) e.touches.push(d.utils.extend({}, b.touches[f]))
            }
            var f = b.timeStamp - e.timeStamp,
                h = b.center.pageX - e.center.pageX,
                l = b.center.pageY - e.center.pageY,
                n = d.utils.getVelocity(f, h, l);
            d.utils.extend(b, {
                deltaTime: f,
                deltaX: h,
                deltaY: l,
                velocityX: n.x,
                velocityY: n.y,
                distance: d.utils.getDistance(e.center, b.center),
                angle: d.utils.getAngle(e.center, b.center),
                direction: d.utils.getDirection(e.center, b.center),
                scale: d.utils.getScale(e.touches, b.touches),
                rotation: d.utils.getRotation(e.touches, b.touches),
                startEvent: e
            });
            return b
        },
        register: function (b) {
            var e = b.defaults || {};
            e[b.name] === n && (e[b.name] = !0);
            d.utils.extend(d.defaults, e, !0);
            b.index = b.index || 1E3;
            this.gestures.push(b);
            this.gestures.sort(function (b, d) {
                return b.index < d.index ? -1 : b.index > d.index ? 1 : 0
            });
            return this.gestures
        }
    };
    d.gestures = d.gestures || {};
    d.gestures.Hold = {
        name: "hold",
        index: 10,
        defaults: {
            hold_timeout: 500,
            hold_threshold: 1
        },
        timer: null,
        handler: function (b, e) {
            switch (b.eventType) {
            case d.EVENT_START:
                clearTimeout(this.timer);
                d.detection.current.name = this.name;
                this.timer = setTimeout(function () {
                    "hold" == d.detection.current.name && e.trigger("hold", b)
                }, e.options.hold_timeout);
                break;
            case d.EVENT_MOVE:
                b.distance > e.options.hold_threshold && clearTimeout(this.timer);
                break;
            case d.EVENT_END:
                clearTimeout(this.timer)
            }
        }
    };
    d.gestures.Tap = {
        name: "tap",
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        handler: function (b, e) {
            if (b.eventType == d.EVENT_END) {
                var f = d.detection.previous,
                    h = !1;
                if (!(b.deltaTime > e.options.tap_max_touchtime || b.distance > e.options.tap_max_distance))
                    if (f && ("tap" == f.name && b.timeStamp - f.lastEvent.timeStamp < e.options.doubletap_interval && b.distance < e.options.doubletap_distance) && (e.trigger("doubletap", b), h = !0), !h || e.options.tap_always) d.detection.current.name = "tap", e.trigger(d.detection.current.name, b)
            }
        }
    };
    d.gestures.Swipe = {
        name: "swipe",
        index: 40,
        defaults: {
            swipe_max_touches: 1,
            swipe_velocity: 0.7
        },
        handler: function (b, e) {
            if (b.eventType == d.EVENT_END && !(0 < e.options.swipe_max_touches && b.touches.length > e.options.swipe_max_touches) && (b.velocityX > e.options.swipe_velocity || b.velocityY > e.options.swipe_velocity)) e.trigger(this.name, b), e.trigger(this.name + b.direction, b)
        }
    };
    d.gestures.Drag = {
        name: "drag",
        index: 50,
        defaults: {
            drag_min_distance: 10,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function (b, e) {
            if (d.detection.current.name != this.name && this.triggered) e.trigger(this.name + "end", b), this.triggered = !1;
            else if (!(0 < e.options.drag_max_touches && b.touches.length > e.options.drag_max_touches)) switch (b.eventType) {
            case d.EVENT_START:
                this.triggered = !1;
                break;
            case d.EVENT_MOVE:
                if (b.distance < e.options.drag_min_distance && d.detection.current.name != this.name) break;
                d.detection.current.name = this.name;
                if (d.detection.current.lastEvent.drag_locked_to_axis || e.options.drag_lock_to_axis && e.options.drag_lock_min_distance <= b.distance) b.drag_locked_to_axis = !0;
                var f = d.detection.current.lastEvent.direction;
                b.drag_locked_to_axis && f !== b.direction && (b.direction = d.utils.isVertical(f) ? 0 > b.deltaY ? d.DIRECTION_UP : d.DIRECTION_DOWN : 0 > b.deltaX ? d.DIRECTION_LEFT : d.DIRECTION_RIGHT);
                this.triggered || (e.trigger(this.name + "start", b), this.triggered = !0);
                e.trigger(this.name, b);
                e.trigger(this.name + b.direction, b);
                (e.options.drag_block_vertical && d.utils.isVertical(b.direction) || e.options.drag_block_horizontal && !d.utils.isVertical(b.direction)) && b.preventDefault();
                break;
            case d.EVENT_END:
                this.triggered && e.trigger(this.name + "end", b), this.triggered = !1
            }
        }
    };
    d.gestures.Transform = {
        name: "transform",
        index: 45,
        defaults: {
            transform_min_scale: 0.01,
            transform_min_rotation: 1,
            transform_always_block: !1
        },
        triggered: !1,
        handler: function (b, e) {
            if (d.detection.current.name != this.name && this.triggered) e.trigger(this.name + "end", b), this.triggered = !1;
            else if (!(2 > b.touches.length)) switch (e.options.transform_always_block && b.preventDefault(), b.eventType) {
            case d.EVENT_START:
                this.triggered = !1;
                break;
            case d.EVENT_MOVE:
                var f = Math.abs(1 - b.scale),
                    h = Math.abs(b.rotation);
                if (f < e.options.transform_min_scale && h < e.options.transform_min_rotation) break;
                d.detection.current.name = this.name;
                this.triggered || (e.trigger(this.name + "start", b), this.triggered = !0);
                e.trigger(this.name, b);
                h > e.options.transform_min_rotation && e.trigger("rotate", b);
                f > e.options.transform_min_scale && (e.trigger("pinch", b), e.trigger("pinch" + (1 > b.scale ? "in" : "out"), b));
                break;
            case d.EVENT_END:
                this.triggered && e.trigger(this.name + "end", b), this.triggered = !1
            }
        }
    };
    d.gestures.Touch = {
        name: "touch",
        index: -Infinity,
        defaults: {
            prevent_default: !1,
            prevent_mouseevents: !1
        },
        handler: function (b, e) {
            e.options.prevent_mouseevents && b.pointerType == d.POINTER_MOUSE ? b.stopDetect() : (e.options.prevent_default && b.preventDefault(), b.eventType == d.EVENT_START && e.trigger(this.name, b))
        }
    };
    d.gestures.Release = {
        name: "release",
        index: Infinity,
        handler: function (b, e) {
            b.eventType == d.EVENT_END && e.trigger(this.name, b)
        }
    };
    "object" === typeof module && "object" === typeof module.exports ? module.exports = d : (h.Hammer = d, "function" === typeof h.define && h.define.amd && h.define("hammer", [], function () {
        return d
    }))
})(this);
(function (h, n) {
    h !== n && (Hammer.event.bindDom = function (d, x, f) {
        h(d).on(x, function (d) {
            var b = d.originalEvent || d;
            b.pageX === n && (b.pageX = d.pageX, b.pageY = d.pageY);
            b.target || (b.target = d.target);
            b.which === n && (b.which = b.button);
            b.preventDefault || (b.preventDefault = d.preventDefault);
            b.stopPropagation || (b.stopPropagation = d.stopPropagation);
            f.call(this, b)
        })
    }, Hammer.Instance.prototype.on = function (d, n) {
        return h(this.element).on(d, n)
    }, Hammer.Instance.prototype.off = function (d, n) {
        return h(this.element).off(d, n)
    }, Hammer.Instance.prototype.trigger = function (d, n) {
        var f = h(this.element);
        f.has(n.target).length && (f = h(n.target));
        return f.trigger({
            type: d,
            gesture: n
        })
    }, h.fn.hammer = function (d) {
        return this.each(function () {
            var n = h(this),
                f = n.data("hammer");
            f ? f && d && Hammer.utils.extend(f.options, d) : n.data("hammer", new Hammer(this, d || {}))
        })
    })
})(window.jQuery || window.Zepto);