<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddProduct.aspx.cs" Inherits="SE256_lab2_JF.Backend.AddProduct" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <a href="~/Backend/ControlPanel.aspx" runat="server" class="link-a">Return to control panel</a>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="CompContent" runat="server">
    <table>
    <tr>
        <td>product id</td>
        <td><asp:Label ID="product_id" runat="server" /></td>
    </tr>

    <tr>
        <td>Product name</td>
        <td><asp:TextBox ID="txtName" runat="server" MaxLength="255" /></td>
    </tr>
    
    <tr>
        <td>Manufacturer</td>
        <td><asp:TextBox ID="txtManufacturer" runat="server" MaxLength="20" /></td>
    </tr>

    <tr>
        <td>Date Expires</td>
        <td><asp:Calendar ID="date_Expires" runat="server" CssClass="calander" /></td>
    </tr>

    <tr>
        <td>Price</td>
        <td><asp:TextBox ID="txtPrice" runat="server" MaxLength="5" /></td>
    </tr>
</table>
<asp:Button ID="submit_button" runat="server" Text="Add" OnClick="submit_button_click" />
<asp:Button ID="update_button" runat="server" Text="Update" OnClick="update_button_Click" />
<asp:Button ID="delete_button" runat="server" Text="Delete" OnClick="delete_button_Click" />
<asp:Button ID="cancel_button" runat="server" Text="Cancel" OnClick="cancel_button_Click" />
<asp:Label ID="feedback_label" runat="server" />
</asp:Content>
