<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddProduct.aspx.cs" Inherits="SE256_lab2_JF.Backend.AddProduct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="CompContent" runat="server">


    <table>
    <tr>
        <td>product id</td>
        <td><asp:Label ID="product_id" runat="server" /></td>
    </tr>

    <tr>
        <td>Product name</td>
        <td><asp:TextBox ID="name" runat="server" MaxLength="255" /></td>
    </tr>
    
    <tr>
        <td>Manufacturer</td>
        <td><asp:TextBox ID="manufacturer" runat="server" MaxLength="20" /></td>
    </tr>

    <tr>
        <td>Date Published</td>
        <td><asp:Calendar ID="date_Expires" runat="server" /></td>
    </tr>

    <tr>
        <td>Price</td>
        <td><asp:TextBox ID="price" runat="server" MaxLength="5" /></td>
    </tr>
</table>
<asp:Button ID="submit_button" runat="server" Text="Add" OnClick="submit_button_click" />
<asp:Label ID="feedback_label" runat="server" />
</asp:Content>
