<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ControlPanel.aspx.cs" Inherits="SE256_lab2_JF.Backend.WebForm1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="CompContent" runat="server">
    <div>
        <h2>Control Panel</h2>

        <table>
            <tr>
                <td><a href="AddProduct.aspx" runat="server">Add a product</a></td>
            </tr>
            <tr>
                <td><asp:Button ID="btnLogout" runat="server" Text="Log out" OnClick="btnLogout_Click" /></td>
            </tr>
        </table>
    </div>
</asp:Content>
