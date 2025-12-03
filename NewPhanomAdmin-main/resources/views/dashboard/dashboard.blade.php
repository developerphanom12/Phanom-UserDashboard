<x-layout.layout>
    <x-slot name="title">Dashboard</x-slot>
    
    @section('content')

        
       <div class="page-content">
            <div class="page-container">

                <div class="row">
                    <div class="col-12">
                        <div class="page-title-head d-flex align-items-sm-center flex-sm-row flex-column">
                            <div class="flex-grow-1">
                                <h4 class="fs-18 text-uppercase fw-bold m-0">Dashboard</h4>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div> <!-- container -->

            <x-partials.footer />
        </div>
    @endsection
</x-layout.layout>