find_package(eosio.cdt)

add_contract(twitch twitch ${CMAKE_CURRENT_SOURCE_DIR}/src/twitch.cpp)

target_include_directories(twitch.wasm
   PUBLIC
   ${CMAKE_CURRENT_SOURCE_DIR}/include)

set_target_properties(twitch.wasm
   PROPERTIES
   RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}")