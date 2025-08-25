import React from "react";

const BayanihanList: React.FC = () => {
  return (
    <div className="p-4 pb-10 shadow bg-white border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div id="whole">
        <div>
          {/* Header with Create Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-bold text-4xl text-[#201B50]">Bayanihan Teams</h1>

            {/* Backend form commented out */}
            {/* <form action="{{ route('chairperson.createBTeam') }}" method="GET">
                @csrf
            */}
            <button
              type="button"
              className="whitespace-nowrap rounded-xl hover:scale-105 transition ease-in-out px-6 py-2 text-black font-semibold flex items-center gap-2"
              style={{ background: "#d7ecf9" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#c3dff3")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#d7ecf9")}
              // TODO: Implement navigation to Create Team page
            >
              {/* SVG Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="7" cy="10" r="3" />
                <circle cx="17" cy="10" r="3" />
                <circle cx="12" cy="16" r="3" />
                <path d="M2 20c0-2.5 3-4.5 5-4.5s5 2 5 4.5" />
                <path d="M12 20c0-2.5 3-4.5 5-4.5s5 2 5 4.5" />
              </svg>
              Create Bayanihan Team
            </button>
            {/* </form> */}
          </div>

          {/* Livewire component replaced with placeholder */}
          {/* <livewire:chair-b-teams /> */}
          <div className="text-gray-500 text-center">
            {/* TODO: Fetch and display Bayanihan Teams list from API */}
            <p>Bayanihan Teams list will appear here.</p>
          </div>

          {/* Backend loop for team cards commented out */}
          {/*
          <div className="ml-10 mr-5">
            @foreach ($bgroups as $bgroup)
              <div className="flex grid-cols-4 gap-4">
                <div className="w-60 h-72 h-auto min-h-fit bg-white rounded-xl shadow-xl hover:scale-105 transition ease-in-out">
                  <div className="w-fit">
                    @php
                      $imageNumber = ($loop->iteration - 1) % 10 + 1;
                    @endphp
                    <img className="rounded-t-xl h-40" src="/assets/bg/{{ $imageNumber }}.png" alt="">
                  </div>
                  <div className="text-xl font-semibold mx-3 text-neutral-900 my-1">
                    {{ $bgroup->course_code }} - {{ $bgroup->bg_school_year }}
                  </div>
                  <div className="text-neutral-900 font-normal mx-3">
                    <h4 className="font-medium">Leader:</h4>
                    @foreach ($bleaders[$bgroup->bg_id] ?? [] as $leader)
                      <p>{{ $leader->lastname }}, {{ $leader->firstname }}</p>
                    @endforeach
                  </div>
                  <div className="text-neutral-900 font-normal mx-3">
                    <h4 className="font-medium">Members:</h4>
                    @foreach ($bmembers[$bgroup->bg_id] ?? [] as $member)
                      <p>{{ $member->lastname }}, {{ $member->firstname }}</p>
                    @endforeach
                  </div>
                  <div className="mr-3 justify-end flex ">
                    <form action="{{ route('chairperson.editBTeam', $bgroup->bg_id) }}" method="GET">
                      @csrf
                      <button type="submit" className="bg-blue p-1 rounded-lg mr-2 mb-2 hover:bg-green">
                        <!-- Edit Icon -->
                      </button>
                    </form>

                    <form action="{{ route('chairperson.destroyBTeam',$bgroup->bg_id) }}" method="Post">
                      @csrf
                      @method('DELETE')
                      <button type="submit" className="bg-blue p-1 rounded-lg mr-2 shadow-lg hover:bg-pink">
                        <!-- Delete Icon -->
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            @endforeach
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default BayanihanList;
