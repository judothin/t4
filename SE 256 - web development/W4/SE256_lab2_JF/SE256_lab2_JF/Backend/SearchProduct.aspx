<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SearchProduct.aspx.cs" Inherits="SE256_lab2_JF.Backend.SearchProduct" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="CompContent" runat="server">
        <h1>Product Search</h1>
        <p>Optional Search Criteria</p>
        <p>
            Product Name: <asp:TextBox ID="txtName" runat="server" Columns="30" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            Manufacturer: <asp:TextBox ID="txtManufacturer" runat="server" Columns="30" />
        </p>
        <br />
        <asp:Button ID="btnSearch" runat="server" Text="Search" OnClick="btnSearch_Click" />
        <br />
        <br />


        <asp:DataGrid ID="dgResults" runat="server" AutoGenerateColumns="false" GridLines="Both" >
            <Columns>
                <asp:BoundColumn DataField="Name" HeaderText="Name" />
                <asp:BoundColumn DataField="Manufacturer" HeaderText="Manufacturer" />
                <asp:BoundColumn DataField="DateExpires" HeaderText="Date Expires" />
                <asp:BoundColumn DataField="Price" HeaderText="Price" />
                <asp:HyperLinkColumn Text="Edit" DataNavigateUrlFormatString="~/Backend/AddProduct.aspx?Id={0}" DataNavigateUrlField="Id" />
            </Columns>
    
        </asp:DataGrid>
        <asp:Label ID="feedback_label" runat="server" />
</asp:Content>
