<template>
    <div class="hold-transition skin-blue sidebar-mini">
      <div class="wrapper">
  
        <!-- Main Header -->
        <header class="main-header">
          <!-- Logo -->
          <a href="#" class="logo">
            <span class="logo-mini"><b>A</b>LT</span>
            <span class="logo-lg"><b>Admin</b>LTE</span>
          </a>
  
          <!-- Navbar -->
          <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a
              href="#"
              class="sidebar-toggle"
              data-toggle="push-menu"
              role="button"
            >
              <span class="sr-only">Toggle navigation</span>
            </a>
  
            <!-- Navbar Right Menu -->
          </nav>
        </header>
  
        <!-- Sidebar -->
        <aside class="main-sidebar">
          <section class="sidebar">
  
            <ul class="sidebar-menu" data-widget="tree">
              <li class="active">
                <router-link to="/admin">
                  <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                </router-link>
              </li>
            </ul>
          </section>
        </aside>
  
        <!-- Content Wrapper -->
        <div class="content-wrapper">
          <section class="content-header">
            <h1>
              Dashboard
              <small>Control panel</small>
            </h1>
          </section>
  
          <section class="content">
            <!-- Router View -->
            <router-view />
          </section>
        </div>
  
        <!-- Main Footer -->
        <footer class="main-footer">
          <div class="pull-right hidden-xs">Version 2.4</div>
          <strong>Copyright &copy; 2025 <a href="#">Your Company</a>.</strong> All rights
          reserved.
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminLayout",
    mounted () {
      // re-init adminlte sidebar setelah render
      if (window.$ && window.$.fn.tree) {
        this.$nextTick(() => {
          window.$('.sidebar-menu').tree()
        })
      }
    }
  }
  </script>
  
  <style>
  /* Kalau perlu tambahan styling */
  </style>
  