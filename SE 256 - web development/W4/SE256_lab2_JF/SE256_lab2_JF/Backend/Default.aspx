<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SE256_Lab2_JF.Backend.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="CompContent" runat="server">
    <div class="login">
        Username: <asp:TextBox ID="username_input" runat="server" />
        <br />
        <br />
        Password: <asp:TextBox ID="password_input" runat="server" textMode="password" />
        <br />
        <br />
        <asp:Button ID="login" runat="server" OnClick="login_button_click" Text="Login" />
        <br />
        <br />
        <asp:Label id="feedback" runat="server" Text="" />
    </div>
</asp:Content>
