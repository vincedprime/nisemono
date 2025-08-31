import { format, parse } from "date-fns";
import random from "lodash.random";
import round from "lodash.round";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ToWords } from 'to-words';
import { numberWithCommas } from "../../utils";

const AmazonInvoice = () => {
    const timeoutRef = useRef(null);
    let [searchParams] = useSearchParams();

    const date = parse(searchParams.get("date"), 'yyyy-MM-dd', new Date());
    const price = round(parseFloat(searchParams.get("price")), 2).toFixed(2);
    const gst = parseInt(searchParams.get("gst"));
    const priceBeforeTax = round(parseFloat(price) / (1 + gst / 100), 2).toFixed(2);
    const tax = round(parseFloat(price) - parseFloat(priceBeforeTax), 2).toFixed(2);
    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
        }
    });

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
        timeoutRef.current = setTimeout(() => {
          window.print();
        }, 1000);
      }, []);

    return (
        <div className="amazon-invoice" style={{ "maxWidth": "688px", "margin": "auto" }}>
            <table>
                <tbody>
                    <tr>
                        <td style={{ "width": "50%" }}>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                            <img alt="Logo" src="data:image/jpg;base64,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" width={212} height={61} />
                        </td>
                        <td style={{ "width": "50%" }}>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                            <h1 style={{ "paddingTop": "4pt", "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                Tax Invoice/Bill of Supply/Cash Memo
                            </h1>
                            <p className="s3" style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                (Original for Recipient)
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                            <h2 style={{ "paddingTop": "8pt", "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                Sold By :
                            </h2>
                            <p style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                More India
                            </p>
                            <p className="s1" style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                *
                                <span className="s2">Building No. CCU1, Mouza, Amraberia,Phase 2: ESR Warehousing
                                    Pvt Ltd, Vill : Amraberia, Rajapur, Joargori Gram Panchayet,
                                    Uluberia, </span><span className="p">Dist. Howrah</span>
                            </p>
                            <p style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                Howrah, WEST BENGAL, 711303
                            </p>
                            <p style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                IN
                            </p>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                        </td>
                        <td>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                            <h2 style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                Billing Address :
                            </h2>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                {searchParams.get("name")}
                            </p>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                {searchParams.get('address')}
                            </p>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                {searchParams.get('city')}, {searchParams.get('state')}, {searchParams.get('pincode')}
                            </p>
                            <p style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "13pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                IN
                            </p>
                            <h2 style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                State/UT Code: <span className="p">05</span>
                            </h2>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>

                            <h2 style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                PAN No: <span className="p">AKZPM1514C</span>
                            </h2>
                            <h2 style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                GST Registration No: <span className="p">19AKZPM1514C2Z0</span>
                            </h2>
                        </td>
                        <td>
                            <h2 style={{ "paddingLeft": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                Shipping Address :
                            </h2>
                            <p style={{ "paddingLeft": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                {searchParams.get("name")}
                            </p>
                            <p style={{ "paddingLeft": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                {searchParams.get("name")}
                            </p>
                            <p style={{ "paddingLeft": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                {searchParams.get('address')}
                            </p>
                            <p style={{ "paddingLeft": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                {searchParams.get('city')}, {searchParams.get('state')}, {searchParams.get('pincode')}
                            </p>
                            <p style={{ "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "13pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                IN
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td />
                        <td>
                            <h2 style={{ "paddingLeft": "69pt", "WebkitTextIndent": "80pt", "textIndent": "80pt", "lineHeight": "106%", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                State/UT Code: <span className="p">05 </span><br />
                                Place of supply: <span className="p">{searchParams.get('state')} </span><br />
                                Place of delivery: <span className="p">{searchParams.get('state')}</span>
                            </h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2 style={{ "paddingTop": "3pt", "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "118%", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                Order Number: <span className="p">{random(100, 999)}-{random(1000000, 9999999)}-{random(1000000, 9999999)} </span>
                                <br />
                                Order Date: <span className="p">{format(date, "dd.MM.yyyy")}</span>
                            </h2>
                        </td>
                        <td>
                            <h2 style={{ "paddingTop": "3pt", "paddingLeft": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "118%", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                Invoice Number : <span className="p">CCU1-{random(1000, 9999)} </span><br />
                                Invoice Details : <span className="p">WB-CCU1-1698401055-{random(1000, 9999)} </span><br />
                                Invoice Date : <span className="p">{format(date, "dd.MM.yyyy")}</span>
                            </h2>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <table style={{ "borderCollapse": "collapse", "margin": "auto" }} cellSpacing={0}>
                <tbody><tr style={{ "height": "23pt" }}>
                    <td style={{ "width": "17pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingLeft": "1pt", "paddingRight": "2pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "11pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Sl. No
                        </p>
                    </td>
                    <td style={{ "width": "262pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingTop": "6pt", "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Description
                        </p>
                    </td>
                    <td style={{ "width": "42pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingLeft": "1pt", "paddingRight": "17pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "11pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Unit Price
                        </p>
                    </td>
                    <td style={{ "width": "17pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingTop": "6pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "center", "textAlign": "center" }}>
                            Qty
                        </p>
                    </td>
                    <td style={{ "width": "42pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingLeft": "1pt", "paddingRight": "5pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "11pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Net Amount
                        </p>
                    </td>
                    <td style={{ "width": "22pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "11pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Tax Rate
                        </p>
                    </td>
                    <td style={{ "width": "23pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "11pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Tax Type
                        </p>
                    </td>
                    <td style={{ "width": "39pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingLeft": "1pt", "paddingRight": "2pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "11pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Tax Amount
                        </p>
                    </td>
                    <td style={{ "width": "47pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                        <p className="s4" style={{ "paddingLeft": "1pt", "paddingRight": "11pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "11pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Total Amount
                        </p>
                    </td>
                </tr>
                    <tr style={{ "height": "33pt" }}>
                        <td style={{ "width": "17pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p className="s5" style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "15pt", "WebkitTextAlign": "center", "textAlign": "center" }}>
                                1
                            </p>
                        </td>
                        <td style={{ "width": "262pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p className="s6" style={{ "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                {searchParams.get('itemName')}
                            </p>
                            <p className="s6" style={{ "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "10pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                HSN:{searchParams.get('hsn') !== null && searchParams.get('hsn') !== '' ? searchParams.get('hsn') : 4023}
                            </p>
                        </td>
                        <td style={{ "width": "42pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p className="s5" style={{ "paddingTop": "8pt", "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                ₹{numberWithCommas(priceBeforeTax)}
                            </p>
                        </td>
                        <td style={{ "width": "17pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p className="s5" style={{ "paddingTop": "8pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "center", "textAlign": "center" }}>
                                1
                            </p>
                        </td>
                        <td style={{ "width": "42pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p className="s5" style={{ "paddingTop": "8pt", "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                ₹{numberWithCommas(priceBeforeTax)}
                            </p>
                        </td>
                        <td style={{ "width": "22pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p className="s5" style={{ "paddingTop": "8pt", "paddingLeft": "2pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                {gst}%
                            </p>
                        </td>
                        <td style={{ "width": "23pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
                            <p className="s6" style={{ "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                IGST
                            </p>
                        </td>
                        <td style={{ "width": "39pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p className="s5" style={{ "paddingTop": "8pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "center", "textAlign": "center" }}>
                                ₹{numberWithCommas(tax)}
                            </p>
                        </td>
                        <td style={{ "width": "47pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                            <p className="s5" style={{ "paddingTop": "8pt", "paddingRight": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                ₹{numberWithCommas(price)}
                            </p>
                        </td>
                    </tr>
                    <tr style={{ "height": "16pt" }}>
                        <td style={{ "width": "425pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "2pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} colSpan={7}>
                            <p className="s4" style={{ "paddingTop": "2pt", "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                TOTAL:
                            </p>
                        </td>
                        <td style={{ "width": "39pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "2pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                            <p className="s7" style={{ "paddingTop": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "14pt", "WebkitTextAlign": "center", "textAlign": "center" }}>
                                ₹{numberWithCommas(tax)}
                            </p>
                        </td>
                        <td style={{ "width": "47pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "2pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} bgcolor="#CACACA">
                            <p className="s7" style={{ "paddingTop": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "14pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                ₹{numberWithCommas(price)}
                            </p>
                        </td>
                    </tr>
                    <tr style={{ "height": "30pt" }}>
                        <td style={{ "width": "511pt", "borderTopStyle": "solid", "borderTopWidth": "2pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} colSpan={9}>
                            <p className="s8" style={{ "paddingTop": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                Amount in Words:
                            </p>
                            <p className="s8" style={{ "paddingTop": "2pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "13pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                                {toWords.convert(price)}
                            </p>
                        </td>
                    </tr>
                    <tr style={{ "height": "67pt" }}>
                        <td style={{ "width": "511pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }} colSpan={9}>
                            <p className="s8" style={{ "paddingTop": "3pt", "paddingBottom": "3pt", "paddingRight": "2pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                For More India:
                            </p>
                            <p style={{ "paddingRight": "3pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                <img alt="Sign" src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAjAKsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8qqMGv6PviN8VtG+H1nGLvy726uBujsYnQHaOWkJPCIoySzcV886v+0f4m169W20u7+ySXDN5NjpdmLt2iG4K8cpBMzE44VRgdzjFAH4j0V+7NnrvjuXwdq0baF4oXVCQ1pcoS0J3Y+9FuWTjnjb2GKg0j46eINImKXKTTfZExdWuqQRwXEj9NscY/eEkjChkJbPbrQB+FtFf0beA/iNo/jyxmFrI9tfwhRdabOoWeBjyNwHbrgg85rlfjV+0P4Q+B0uh6d4ggv559al8ixisrBpjI4x8p6Dv0zQB/PnRX9APw8/ad+H3xB8J6h4m03VotM0rS7hrW/m1NPsQt5AB8jFwOoPrjjvWg3x98DzeEdT8Raf4r07U9I0gO901q6uUUKePxxxnrQB/PdRX7eeHP23PCHijwl4x8SR6Hq9ha+G4opXF7FDEbhZOF2HeRz1w2OvrxV61/aw8Ial8RvCXgqztrm41XXbVLuRIo1dLFGjDqJiDjkEfdyPfmgD8NaK/ob8W+JNL8IaHqOsajcRWVnYxNNNMxCBQDyPb0xXylp//AAUQ8J3vhzxRqd14bvrDUdEZFtdHaRTNqCnJVl+UFRj5iSvA9aAPyRor9rPCf7V3hXXvgxpPxC1qJNBttUna2isQTczedvKLGm1QzsSPQdfaqV9+2F8OLDw1qGsX15qWlnTrtLS602ezZbxJ36KYs5ORlsg9AfYUAfjBRX7KeMP2vfAXg6fSrK5uNTvb/UY4blLO2si88KTEeWZAWGCcg7ck4OcV62kgYbZYd0SIH+6N3446UAfghRX7uM0bArJFGDuBVwF3DGSOf/11Gt2YXEkMnk4PDs2QBxxnnHt9fagD8J6K/oS8PalBI2VkXbjhEZeT0yRjjP0rR+wRY3q6hWAb5Plwfp0zz29aAP53KK/dzWtOWz+MdjISFS+0edHGcF2jliwQfpKee3PrWnLpcIkbdPbq2eQwBP8AKgDxP4hTeLfFPj/xvd2Wi3Oq2kcrWUp823eCOFI0ZV8pmDhuS3IIOela/wAG/jHL4A0iKHT/AIbapq95Pk3euxq4S5bbnYjRxP8AdA2BDjBA9zXV/G74J6tr2sP4m8Ii1OsNGEure6hDhhjBlhVmVPNCgcPgHA5BrxLwN458ffC3xTa6Jp+r29wb2Vml07X4Baxeaep3MymMYXJKBkyRjcTQB9Cp+1J4iu57KKy+E3iSbz0YTCa3kjaGYMQsTExEfNhTu+6A3JrzP41/ErX/AB94evk8SfC3VNAtbLc0Ou72L23TAOY03q5O0qpI716Bqnxz8R6T4i0bw1e6ZoB1bUo3kge21G7kt1VQSSz/AGMqpGDwX7deRXhHxX8Z+Pfib4zn8O315b37aeRLZ6XoiG5s7k9FVnALCTnOWG0ex5oA3vgtPd+G/idpCRGGys/tRtYIbW2RA0TRlm3ToSsm3AO0gEEHivV/jT+ylovxu+JFj4n8R63qElhYae1raaXbMIlgkYktMJAchvu44/hHJ6Vlfs/fAW38DXS+J9c0xLPXGVlt7CJxN9mB+80jjgyEf3QAB75NY37Q37Qfi/wx4707w78O9Kk1q80+E6jrcItGuv3RbakOU/1bthiCSAMCgCra/sMWEPwqHga98d6zNZwanHqNhKLOFWtmUcK3y4kyeTu7/jnU1n9iLwvrej+JYNU8R6veav4ieGTU9SgaC2kcR52osaptVTuOcAk8fhi69+3RoFjpur6nBaW/+jafb3thHeXfky3zyOyywqmzIkiK4YDPXtXI6d+0z8TdZ8d2+kpHoTTR6nqNq1hPLJEphRVeB3YIWHG7BHDc5xQB2Uf/AAT++H9rofiDRrTUtftbHWEtlmiF6jKzQMSpBKk5OeQfwAr0HSP2d/Cfhb4onx7p93qUWqf2emmNZi5DWxijVFXKY3dF9cZ5xXjes/tieKPsunXtl4YisFuNLF0yXq3EhuZ97I1tbmGMjPyhskAkEcdTRP8AHr4oavZDWV8ORaZZ2utpYjSEtJxO6FGIaV8E7d20HavXoe1AHvnxR+F+ifFzTbPTvEEl1NpkFxFdG2trjyorlk5VJe7Ln5sZHSufuv2dvh5/wnt34xuNAtpdZltfsU7MQUeJkEfKfdHyZXI7V4C/7Unxdl0rUZ4fAAOpW00aPO+i3a20EbOQ+A0m+ZlOMBVH3s44qh4o+NHxj8TeB7y2v9Fk0KS5067+z32laLdyTSTg7Y1CMyPb5HO9wRkelAHt0f7Jfwqt9An0RdAlTTZL4ajHaNeTBoJ8A7oCr5j46bSOKfJ+zp8PLWwgspPD0Nw0N8uoC4upZJJpLgcLJJIzMzkDGNxxxjFcV8TE1/xD8CvCsavq66rFBaS6lFZ3G24ICAyCRRJE8gz95FdG68nofG7bU/iBoF+t7YQmG1sBfS295q16+AfsmUYwSTSSookAABZsknAAOKAPqPWPgZ4C1jxfb+LtS8MafeeIo9hW8lQtyuNm4HKkjAwcHtjpXUF42MiqxiUL9AB6YH9a+I/DXx48Z+PPEY07SvGWoJpIWwe7vr1NPimiDORciNlUrwuCAQXAHT1s+K/GnxfuoPK0rxpZMLVpoo75dRsD9o/eHyXlTK7cqf4c/wC7QB9ivObq2ZVctMBl1kcjaO/H0xVSOWRomLEszAruLY2gfU8jkc5FfIdiPG2k67qMiay89nf34vLmOz1tYpZt8CKVRwrFdkgfgYBG3njFT/2Z4y/s7W73xF4u1qa/i0+BtNfRluZvKuA0hYNCgVZQR5YJI+bB4HWgD7K8P3ciTYMhZlxk7Tnrx3P8q7+yuUlRT57Fgdyk8lj0OeBxye4r4++BHjrUtH8NG68YnVB4g1Kc3dxbfYLopbBuFijAQ4wqjgd8173oXxQ0+6WJRY6xK3y7mXSbjIGOwMYx+IFAGl45QL8QfBV4rKple7sSpAK5eIScD/tj05reuLC3aZyzFWzyFVQM/nXJeKdSn8XX/hb7BouomWx1eK4uHmtGijWExSo5LMRyA44GT7V6RvH/ADxZh2JQnI+uKAM27vpwipvyhydrAEZyex+lcd44vDe6OkF1BaXcDkFobm0ilQnP91lIoooA8b8QaPpFqhMXh7QUyrMVGj2u3OCenl4/Cubsfi94p8N2X2fSb21023UgCG1062jQcgfdEeKKKAM0/tFfENVAXxEyhmbIW0twOh9I62dC+J/ie9u7q5k1RhcXJxPLFDHG0oA43FVGcZ70UUAX9MtIrtisi4WO5faIyUxnkn5cV6RFocNw6Svc6iJHkUM0epXCFhzwcOMiiigDodI8B6Xe2eZptWf9+DxrN4PU9patw+AdIjgjA/tBlO7KyapdOOvoZDiiigBi/Dzw9LPAJdOE4lBVxNLI4I/FjTNR+F/hK3muCvh7TyRkZeAOecg5znNFFAFe2+HHhR7cofDWklBnC/Yo8dBz93rTbPwnoVvcBotD0yJkY7WjsolK9uCFyOOKKKAJoPD+liTjTrXjcB+5XgZPtUd3aw27W4iiWMFiMKMDv2/CiigCnb28UquzRqTnHAxxuP8AhUIYss6knaJAMdumKKKAKszGOP5QB82Og9K2/CdzKzby5Lr8obuBRRQB6V4ZJkeCNjlGLbl9f84FSTDMp6/gaKKAP//Z" width={171} height={35} />
                            </p>
                            <p className="s8" style={{ "paddingTop": "3pt", "paddingRight": "2pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                                Authorized Signatory
                            </p>
                        </td>
                    </tr>
                </tbody></table>
            <p style={{ "paddingLeft": "1pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                Whether tax is payable under reverse charge - No
            </p>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <table style={{ "borderCollapse": "collapse", "margin": "auto" }} cellSpacing={0}>
                <tbody><tr style={{ "height": "25pt" }}>
                    <td style={{ "width": "200pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                        <p className="s9" style={{ "paddingTop": "4pt", "paddingLeft": "4pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Payment Transaction ID:
                        </p>
                        <p className="s10" style={{ "paddingLeft": "4pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            11115eT29Cl8WmpUyvPX5UMUD
                        </p>
                    </td>
                    <td style={{ "width": "131pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                        <p className="s9" style={{ "paddingTop": "4pt", "paddingLeft": "4pt", "paddingRight": "2pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "lineHeight": "106%", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Date &amp; Time: <span className="s10">{format(date, "dd/MM/yyyy")}, {format(new Date(), "HH:mm:ss")} hrs</span>
                        </p>
                    </td>
                    <td style={{ "width": "84pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                        <p className="s9" style={{ "paddingTop": "4pt", "paddingLeft": "4pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Invoice Value:
                        </p>
                        <p className="s10" style={{ "paddingLeft": "4pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            {numberWithCommas(price)}
                        </p>
                    </td>
                    <td style={{ "width": "96pt", "borderTopStyle": "solid", "borderTopWidth": "1pt", "borderLeftStyle": "solid", "borderLeftWidth": "1pt", "borderBottomStyle": "solid", "borderBottomWidth": "1pt", "borderRightStyle": "solid", "borderRightWidth": "1pt" }}>
                        <p className="s9" style={{ "paddingTop": "4pt", "paddingLeft": "4pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            Mode of Payment:
                        </p>
                        <p className="s10" style={{ "paddingLeft": "4pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}>
                            CreditCard
                        </p>
                    </td>
                </tr>
                </tbody></table>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <p style={{ "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "left", "textAlign": "left" }}><br /></p>
            <p className="s11" style={{ "paddingLeft": "62pt", "WebkitTextIndent": "8pt", "textIndent": "8pt", "lineHeight": "206%", "WebkitTextAlign": "left", "textAlign": "left" }}>
                *ASSPL-Amazon Seller Services Pvt. Ltd., ARIPL-Amazon Retail India Pvt.
                Ltd. (only where Amazon Retail India Pvt. Ltd. fulfillment center is
                co-located) Customers desirous of availing input GST credit are
                requested to create a Business account and purchase on
                Amazon.in/business from Business eligible offers
            </p>
            <p className="s11" style={{ "paddingLeft": "191pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "center", "textAlign": "center" }}>
                Please note that this invoice is not a demand for payment
            </p>
            <p className="s11" style={{ "paddingRight": "0pt", "WebkitTextIndent": "0pt", "textIndent": "0pt", "WebkitTextAlign": "right", "textAlign": "right" }}>
                Page 1 of 1
            </p>
        </div>
    );
};

export default AmazonInvoice;