<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SE256_lab2_JF.Backend.Default" %>


<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="CompContent" runat="server">
    <div>
        Username: <asp:TextBox ID="txtUname" runat="server" />
        <br />
        <br />
        Password: <asp:TextBox ID="txtPW" runat="server" />
        <br />
        <br />
        <asp:Button ID="btnLogin" runat="server" OnClick="btnLogin_Click" Text="Login" />
        <br />
        <br />
        <asp:Label ID="lblFeedback" runat="server" Text="" />
    </div>
</asp:Content>
