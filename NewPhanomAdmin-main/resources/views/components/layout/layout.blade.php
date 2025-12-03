<x-partials.html />

<head>
    <x-partials.title-meta title="{{ $title }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <x-partials.head-css />
</head>

<body>
    <!-- Begin page -->
    <div class="wrapper">

        <x-partials.menu />



            @yield('content')

        

    </div>

    <x-partials.customizer />

    
<script src="{{ asset('assets/js/vendor.min.js') }}"></script>

<script src="{{ asset('assets/js/app.js') }}"></script>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Bootstrap -->
{{-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> --}}

{{-- <!-- ApexCharts -->
<script src="https://cdn.jsdelivr.net/npm/apexcharts@3.51.0"></script>

<!-- Choices.js -->
<script src="https://cdn.jsdelivr.net/npm/choices.js@10.2.0/public/assets/scripts/choices.min.js"></script>

<!-- DataTables Core -->
<script src="https://cdn.datatables.net/2.0.8/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/2.0.8/js/dataTables.bootstrap5.min.js"></script>

<!-- DataTables Buttons -->
<script src="https://cdn.datatables.net/buttons/3.0.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/3.0.2/js/buttons.bootstrap5.min.js"></script>

<!-- DataTables FixedColumns -->
<script src="https://cdn.datatables.net/fixedcolumns/5.0.0/js/dataTables.fixedColumns.min.js"></script>

<!-- DataTables FixedHeader -->
<script src="https://cdn.datatables.net/fixedheader/4.0.1/js/dataTables.fixedHeader.min.js"></script>

<!-- DataTables KeyTable -->
<script src="https://cdn.datatables.net/keytable/2.12.1/js/dataTables.keyTable.min.js"></script>

<!-- DataTables Responsive -->
<script src="https://cdn.datatables.net/responsive/3.0.2/js/dataTables.responsive.min.js"></script>

<!-- DataTables Select -->
<script src="https://cdn.datatables.net/select/2.0.3/js/dataTables.select.min.js"></script>

<!-- DateRangePicker -->
<script src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/daterangepicker@3.1.0/daterangepicker.min.js"></script>

<!-- Dragula -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.3/dragula.min.js"></script>

<!-- Dropzone -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/6.0.0-beta.2/dropzone-min.js"></script>

<!-- Flatpickr -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js"></script>

<!-- FullCalendar -->
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.14/index.global.min.js"></script>

<!-- GMaps -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gmaps.js/0.4.25/gmaps.min.js"></script>

<!-- Grid.js -->
<script src="https://unpkg.com/gridjs/dist/gridjs.umd.js"></script>
 --}}
<!-- Iconify -->
{{-- <script src="https://code.iconify.design/1/1.0.8/iconify.min.js"></script> --}}

{{-- <!-- Inputmask -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/inputmask/5.0.9/inputmask.min.js"></script> --}}

{{-- <!-- jQuery DataTables Checkboxes -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datatables-checkboxes/1.2.14/js/dataTables.checkboxes.min.js"></script> --}}

<!-- jQuery Toast Plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js"></script>

<!-- jsvectormap -->
{{-- <script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.6.0"></script> --}}

<!-- Leaflet -->
{{-- <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script> --}}

<!-- Lucide -->
<script src="https://unpkg.com/lucide@0.414.0/dist/umd/lucide.min.js"></script>

<!-- Moment.js -->
{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script> --}}

<!-- noUiSlider -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.7.1/nouislider.min.js"></script>

<!-- Quill -->
<script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>

<!-- Rater.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/rater-js/1.0.1/rater.min.js"></script>

<!-- Select2 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.full.min.js"></script>

<!-- Simplebar -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/simplebar/6.2.7/simplebar.min.js"></script>

<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.7/dist/sweetalert2.all.min.js"></script>

<!-- Swiper -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11.0.7/swiper-bundle.min.js"></script>

<!-- Vanilla Wizard -->
<script src="https://cdn.jsdelivr.net/npm/vanilla-wizard@0.0.7/dist/vanilla-wizard.min.js"></script>

<!-- wNumb -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/wnumb/1.2.0/wNumb.min.js"></script>

<!-- Pickr -->
<script src="https://cdn.jsdelivr.net/npm/@simonwep/pickr@1.9.1/dist/pickr.min.js"></script>



    <!-- Projects Analytics Dashboard App js -->
    <script src="{{ asset('assets/js/pages/dashboard-sales.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>


    {{-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> --}}
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>
@stack('scripts')

</body>

</html>
