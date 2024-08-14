<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ControlPanel.aspx.cs" Inherits="SE256_lab2_JF.Backend.ControlPanel" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="CompContent" runat="server">
    <div>
        <h2>Control Panel</h2>
        <asp:Label ID="feedback_label" runat="server" />
        <table>
            <tr>
                <td><a href="AddProduct.aspx" runat="server">Add a New Product</a></td>
            </tr>
            <tr>
                <td><a href="SearchProduct.aspx" runat="server">Search a Product</a></td>
            </tr>
            <tr>
                <td><asp:Button ID="logout_button" runat="server" Text="Log Out" OnClick="btnLogout_Click" /></td>
            </tr>
        </table>
    </div>
</asp:Content>

